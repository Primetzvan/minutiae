import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Door } from './entities/door.entity';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';

@Injectable()
export class DoorsService {
  constructor(
    @InjectRepository(Door)
    private readonly doorRepository: Repository<Door>,
  ) {}

  findAll() {
    return this.doorRepository.find();
  }

  async findOneById(uuid: string) {
    const door = await this.doorRepository.findOne(
      { uuid: uuid },
      {
        relations: ['accessors'],
      },
    );

    if (!door) {
      throw new NotFoundException(`door #${uuid} not found`);
    }
    return door;
  }

  create(createDoorDto: CreateDoorDto) {
    const door = this.doorRepository.create(createDoorDto);

    return this.doorRepository.save(door).catch((err) => {
      if (err && err.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          {
            message: 'IP and doorname must be unique',
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

  async update(uuid: string, updateDoorDto: UpdateDoorDto) {
    const door = await this.doorRepository.preload({
      uuid: uuid,
      ...updateDoorDto,
    });
    if (!door) {
      throw new NotFoundException(`Door '${uuid}' not found`);
    }
    return this.doorRepository.save(door).catch((err) => {
      // Unique constraint Verletzung
      if (err && err.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          {
            message: 'Ip address and doorname must be unique',
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

  async remove(uuid: string) {
    const door = await this.findOneById(uuid);
    return this.doorRepository.remove(door);
  }
}
