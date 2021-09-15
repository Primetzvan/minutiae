import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Finger } from './entities/finger.entity';
import { User } from '../users/entities/user.entity';
import { CreateFingerDto } from './dto/create-finger.entity';

@Injectable()
export class FingersService {
  constructor(
    @InjectRepository(Finger)
    private readonly fingerRepository: Repository<Finger>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createFingerDto: CreateFingerDto) {
    let user = await this.userRepository.findOne(
      {
        uuid: createFingerDto.userId,
      },
      {
        relations: ['finger'],
      },
    );

    if (!user) {
      throw new NotFoundException(`User '${createFingerDto.userId}' not found`);
    } else if (user.finger !== null) {
      throw new BadRequestException(
        `User '${createFingerDto.userId}' already has a finger, please remove finger before creating a new one`,
      );
    }

    const f = this.fingerRepository.create();
    await this.fingerRepository.save(f);

    user = await this.userRepository.preload({
      uuid: createFingerDto.userId,
      finger: f,
    });

    return this.userRepository.save(user);
  }

  async remove(userId: string) {
    let user = await this.userRepository.findOne(
      { uuid: userId },
      {
        relations: ['finger'],
      },
    );

    if (!user) {
      throw new NotFoundException(`User '${userId}' not found`);
    }

    const finger = user.finger;

    // remove reference
    user = await this.userRepository.preload({
      uuid: userId,
      finger: null,
    });
    await this.userRepository.save(user);

    if (!finger) {
      throw new NotFoundException(`User '${userId}' has no finger`);
    }

    // remove finger
    return this.fingerRepository.remove(finger);
  }
}
