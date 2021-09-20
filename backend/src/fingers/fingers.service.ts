import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Finger, FingerStatus } from "./entities/finger.entity";
import { User } from '../users/entities/user.entity';
import { CreateFingerDto } from './dto/create-finger.entity';
import { nanoid } from "nanoid";

let sessionIdCache;

@Injectable()
export class FingersService {
  constructor(
    @InjectRepository(Finger)
    private readonly fingerRepository: Repository<Finger>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createFingerDto: CreateFingerDto) {
    const user = await this.findUserById(createFingerDto.userId);

    if (user.finger !== null) {
      throw new BadRequestException(
        `User '${createFingerDto.userId}' already has a finger, please remove finger before creating a new one`,
      );
    }

    sessionIdCache = nanoid(10);

    const f = this.fingerRepository.create({
      sessionId: sessionIdCache,
      user: user,
      sessionExpires: new Date(Date.now() + 1000 * 60 * parseInt(process.env.CREATE_FINGER_SESSION_EXPIRES)),
    });
    await this.fingerRepository.save(f).catch((err) => {
      return err;
    });

    return sessionIdCache;
  }

  async getCreateStatus(sessionId: string) {
    const finger = await this.findFingerBySessionId(sessionId);

    if (finger.sessionExpires != null && +Date.now() > +finger.sessionExpires) {
      await this.fingerRepository.remove(finger);
      return 'expired';
    } else if (finger.status === FingerStatus.FAILED) {
      await this.fingerRepository.remove(finger);
    }

    return finger.status;
  }

  async removeBySessionId(sessionId: string) {
    const finger = await this.findFingerBySessionId(sessionId);
    return this.fingerRepository.remove(finger);
  }

  async removeForUser(userId: string) {
    const user = await this.findUserById(userId);
    const finger = user.finger;
    if (!finger) {
      throw new NotFoundException(`User #'${userId}' has no finger`);
    }
    // remove finger
    return {
      externalFingerId: finger.externalId,
      removed: this.fingerRepository.remove(finger),
    };
  }

  private async findUserById(userId: string) {
    const user = await this.userRepository.findOne(
      {
        uuid: userId,
      },
      {
        relations: ['finger'],
      },
    );

    if (!user) {
      throw new NotFoundException(`User '${userId}' not found`);
    }
    return user;
  }

  private async findFingerBySessionId(sessionId: string) {
    const finger = await this.fingerRepository.findOne({
      sessionId: sessionId,
    });
    if (!finger) {
      throw new NotFoundException(`There is no finger with '${sessionId}'`);
    }
    return finger;
  }
}
