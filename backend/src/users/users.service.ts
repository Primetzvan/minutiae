import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.repository';
import { Door } from '../doors/entities/door.entity';
import { CreateAccessDto, UpdateAccessDto } from './dto/create-access.dto';
import { IP } from '../mqtt/constants';
import { LogsService } from '../logs/logs.service';
import { Access } from '../accesses/entities/access.entity';
import { AccessRepository } from 'src/accesses/repositories/access.repository';
import { accessSync } from 'fs';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    @InjectRepository(Access)
    private readonly accessRepository: AccessRepository,

    @InjectRepository(Door)
    private readonly doorRepository: Repository<Door>,

    @Inject(forwardRef(() => LogsService))
    private readonly logsService: LogsService,
  ) {}

  async onModuleInit() {
    if ((await this.userRepository.count()) === 0) {
      const user = this.userRepository.create({
        username: 'admin',
        password: await this.generateHash('admin'),
        role: UserRole.ADMIN,
      });
      this.userRepository.save(user).catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    }
  }

  findAll() {
    return this.userRepository.find({
      relations: ['finger', 'accesses'],
    });
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOne(
      { uuid: id },
      {
        relations: ['accesses', 'finger'],
      },
    );
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }

    return user;
  }

  // Checks if it finds user by mail if handed usernameormail looks like mail format
  // If not checks if theres a user with username equal to handed usernameormail
  async findOne(usernameormail: string): Promise<User | undefined> {
    let user: User;
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (reg.test(String(usernameormail).toLowerCase())) {
      user = await this.userRepository.findOne({ email: usernameormail });
    }
    if (!user) {
      user = await this.userRepository.findOne({ username: usernameormail });
    }

    if (!user) {
      throw new NotFoundException(`user '${usernameormail}' not found`);
    }

    return user;
  }

  async create(modifier: User, createUserDto: CreateUserDto) {
    let user = this.userRepository.create(createUserDto);

    user = await this.saveUser(user);

    this.createUserLog(modifier, 'CREATE', user.toString(), null).catch(() => {
      console.log('No log created');
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, modifier: User) {
    const userBeforeUpdate = await this.findOneById(id);
    let user = await this.userRepository.preload({
      uuid: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with id #'${id}' not found`);
    }

    if (user.role == UserRole.USER && user.password != null) {
      user.password = null;
    }

    if (user.role !== UserRole.ADMIN && updateUserDto.password != null) {
      throw new BadRequestException(
        "User with Role 'User/Leader' cant have a password",
      );
    } else if (
      updateUserDto.role == UserRole.ADMIN &&
      updateUserDto.password == null &&
      userBeforeUpdate.role != UserRole.ADMIN
    ) {
      throw new BadRequestException(
        "User with Role 'Admin' must have a password",
      );
    } else if (
      updateUserDto.role == UserRole.ADMIN &&
      updateUserDto.password != null
    ) {
      user.password = await this.generateHash(updateUserDto.password);
    }

    user = await this.saveUser(user);

    const {
      password,
      currentHashedRefreshToken,
      accesses,
      finger,
      ...newUser
    } = user;
    delete userBeforeUpdate.password;
    delete userBeforeUpdate.currentHashedRefreshToken;
    delete userBeforeUpdate.accesses;
    delete userBeforeUpdate.finger;

    if (modifier != null) {
      this.createUserLog(
        modifier,
        'UPDATE',
        JSON.stringify(newUser),
        JSON.stringify(userBeforeUpdate),
      ).catch((err) => {
        console.log('no log created');
      });
    }
    return user;
  }

  async saveUser(user: User) {
    return await this.userRepository.save(user).catch((err) => {
      // Unique constraint Verletzung
      if (err && err.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          {
            message: 'Username must be unique',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
  }

  async generateHash(password: string) {
    const saltOrRounds = 5;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async remove(id: string, loggedInAdmin: User) {
    const user = await this.findOneById(id);

    // check if logged-in user is not deleting himself and (included) if he isnt the last admin
    if (user.uuid != loggedInAdmin.uuid) {
      return this.removeUser(loggedInAdmin, user);
    } else if (user.uuid == loggedInAdmin.uuid) {
      const adminsCount =
        (await this.userRepository.count({ role: UserRole.ADMIN })) || false;

      if (adminsCount > 1) {
        return this.removeUser(loggedInAdmin, loggedInAdmin);
      } else {
        throw new BadRequestException(`Cant delete last admin`);
      }
    }
  }

  //TODO: wenn angemeldeter admin gelöscht wird, wird nicht erkannt das man keinen zugriff mehr hat!! => sobald gefixt auch im frontend admin profil eigene löschun ermöglichen

  async removeUser(loggedInAdmin: User, user: User) {
    this.createUserLog(loggedInAdmin, 'DELETE', null, user.toString()).catch(
      () => {
        console.log('No log created');
      },
    );
    return this.userRepository.remove(user);
  }

  async addOrRemoveAccess(createAccessDto: CreateAccessDto, modifier: User) {
    let user = await this.userRepository.findOne(
      {
        uuid: createAccessDto.userId,
      },
      {
        relations: ['accesses'],
      },
    );
    if (!user) {
      throw new NotFoundException(`User '${createAccessDto.userId}' not found`);
    }

    //Delete all accesses
    //user.accesses = [];

    user = await this.userRepository.preload({
      uuid: createAccessDto.userId,
      accesses: user.accesses,
    });

    //Add all accesses
    for (const acc of user.accesses) {
      if (!createAccessDto.accesses.includes(acc.door.uuid)) {
        await this.accessRepository.remove(acc);

        this.createUserLog(
          modifier,
          'REMOVE',
          'User: ' + user.toString() + ' -> Door: ' + acc.door.toString(),
          null,
        ).catch(() => {
          console.log('No log created');
        });
      }
    }

    for (const doorId of createAccessDto.accesses) {
      const door = await this.doorRepository.findOne({
        uuid: doorId,
      });
      if (!door) {
        throw new NotFoundException(`Door '${doorId}' not found`);
      }

      if (user.accesses.filter(access => access.door.uuid == doorId).length == 0) {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);

        await this.accessRepository.save({
          door: door,
          expireDate: date.toString(),
          user: user,
        });

        this.createUserLog(
          modifier,
          'CREATE',
          'User: ' + user.toString() + ' -> Door: ' + door.toString(),
          null,
        ).catch(() => {
          console.log('No log created');
        });
      }
    }

    return this.userRepository.findOne(
      {
        uuid: user.uuid,
      },
      {
        relations: ['accesses'],
      },
    );
  }

  async removeAccess(accessId: string, modifier: User) {
    const access = await this.accessRepository.findOne(accessId);

    this.createUserLog(
      modifier,
      'REMOVE',
      'User: ' + modifier.toString() + ' -> Door: ' + access.door.toString(),
      null,
    ).catch(() => {
      console.log('No log created');
    });

    await this.accessRepository.remove(access);
  }

  /* async addOrRemoveAccess(createAccessDto: CreateAccessDto, modifier: User) {
      let user = await this.userRepository.findOne(
        {
          uuid: createAccessDto.userId,
        },
        {
          relations: ['accesses'],
        },
      );
      if (!user) {
        throw new NotFoundException(`User '${createAccessDto.userId}' not found`);
      }

      //Delete all accesses
      //user.accesses = [];

      user = await this.userRepository.preload({
        uuid: createAccessDto.userId,
        accesses: user.accesses,
      });

      //Add all accesses
      for (const acc of createAccessDto.accesses) {
        const door = await this.doorRepository.findOne({
          uuid: acc,
        });
        if (!door) {
          throw new NotFoundException(`Door '${acc}' not found`);
        }

        // if door is already in accesses then remove, otherwise add
        const access: Access | null = await this.accessRepository.findOne(
          {
            door: door,
          },
          {
            relations: ['door'],
          },
        );

        if (access) {
          await this.accessRepository.remove(access);
        } else {
          let date = new Date();
          date.setFullYear(date.getFullYear() + 1);

          await this.accessRepository.save({
            door: door,
            expireDate: date.toString(),
            user: user,
          });
        }

        this.createUserLog(
          modifier,
          'CREATE',
          'User: ' + user.toString() + ' -> Door: ' + door.toString(),
          null,
        ).catch(() => {
          console.log('No log created');
        });
      }

      return this.userRepository.findOne(
        {
          uuid: user.uuid,
        },
        {
          relations: ['accesses'],
        },
      );
    }*/

  async updateAccessExpireDate(
    updateAccessDto: UpdateAccessDto,
    modifier: User,
  ) {
    let access = await this.accessRepository.findOne({
      uuid: updateAccessDto.accessId,
    });
    if (!access) {
      throw new NotFoundException(
        `Access '${updateAccessDto.accessId}' not found`,
      );
    }

    access = await this.accessRepository.preload({
      ...access,
      expireDate: updateAccessDto.expireDate.toString(),
    });
    if (!access) {
      throw new NotFoundException(
        `Access '${updateAccessDto.accessId}' not found`,
      );
    }

    await this.accessRepository.save(access).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async hasAccess(user: User) {
    const door = await this.findActualRaspberryInDoortable();

    const accesses = user.accesses ?? [];

    let ret = false;
    accesses.forEach((accessable) => {
      if (door.uuid === accessable.door.uuid) {
        console.log(accessable.expireDate);
        if (new Date(accessable.expireDate) > new Date()) ret = true;
      }
    });
    return ret;
  }

  /*async removeAccess(createAccessDto: CreateAccessDto, modifier: User) {
    const { userId, doorIds } = createAccessDto;

    const door = await this.doorRepository.findOne({
      uuid: doorId,
    });
    if (!door) {
      throw new NotFoundException(`Door '${doorId}' not found`);
    }

    let user = await this.userRepository.findOne(
      {
        uuid: userId,
      },
      {
        relations: ['accesses'],
      },
    );
    if (!user) {
      throw new NotFoundException(`User '${userId}' not found`);
    }

    const accesses = user.accesses ?? [];
    let found = false;
    let index = 0;

    accesses.forEach(function (door) {
      if (door.uuid === doorId) {
        accesses.splice(index, 1);
        found = true;
      }
      index++;
    });

    if (!found) {
      throw new BadRequestException(
        `User '${userId}' has no Access to Door '${doorId}'`,
      );
    }

    this.createUserLog(modifier, 'DELETE', null, 'User: ' + user.toString() + ' -> Door: ' + door.toString()).catch(() => {
      console.log('No log created');
    });

    // remove reference
    user = await this.userRepository.preload({
      uuid: userId,
      accesses: accesses,
    });
    await this.userRepository.save(user);
  }*/

  async findActualRaspberryInDoortable() {
    //const ip = '10.0.0.1';
    const ip = IP;

    const door = await this.doorRepository.findOne({
      ip: ip,
    });
    if (!door) {
      throw new NotFoundException(`Door with IP '${ip}' not in the System`);
    }
    return door;
  }

  async createUserLog(
    modifier: User,
    action: string,
    newVal: string,
    oldVal: string,
  ) {
    await this.logsService.createConfigLog(
      {
        action: action,
        modifiedTable: 'USER',
        newValue: newVal || 'NONE',
        oldValue: oldVal || 'NONE',
      },
      modifier,
    );
  }
}
