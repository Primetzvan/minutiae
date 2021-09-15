import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.repository';
import { Door } from '../doors/entities/door.entity';
import { CreateAccessDto } from './dto/create-access.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    @InjectRepository(Door)
    private readonly doorRepository: Repository<Door>,
  ) {}

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

    /*
    // TODO: test with finger
    const dto = {
      ...user,
      finger: user.finger !== null,
    };
    return plainToClass(User, dto);
     */

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

    return user;
  }

  // TODO: username already in use exception
  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user).catch((err) => {
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

  // TODO: check for "username already used", "user has password", "admin has no password"
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
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
        "User with Role 'User' cant have a password",
      );
    } else if (
      updateUserDto.role == UserRole.ADMIN &&
      updateUserDto.password == null
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
    return this.userRepository.save(user).catch((err) => {
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

  async remove(id: string) {
    const user = await this.findOneById(id);
    return this.userRepository.remove(user);
  }

  async addAccess(createAccessDto: CreateAccessDto) {
    const door = await this.doorRepository.findOne({
      uuid: createAccessDto.doorId,
    });
    if (!door) {
      throw new NotFoundException(`Door '${createAccessDto.doorId}' not found`);
    }

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

    const accesses = user.accesses ?? [];
    if (user.accesses != []) {
      accesses.forEach(function (door) {
        if (door.uuid === createAccessDto.doorId) {
          throw new BadRequestException(
            `User '${createAccessDto.userId}' already has access to door '${createAccessDto.doorId}'`,
          );
        }
      });
    }
    accesses.push(door);

    // TODO: geht evtl hübscher?
    user = await this.userRepository.preload({
      uuid: createAccessDto.userId,
      accesses: accesses,
    });

    return this.userRepository.save(user);
  }

  async removeAccess(createAccessDto: CreateAccessDto) {
    const { userId, doorId } = createAccessDto;

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

    // remove reference
    user = await this.userRepository.preload({
      uuid: userId,
      accesses: accesses,
    });
    await this.userRepository.save(user);
  }
}
