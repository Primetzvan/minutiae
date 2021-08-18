import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Finger } from './entities/finger.entity';

@Injectable()
export class FingersService {
  constructor(
    @InjectRepository(Finger)
    private readonly fingerRepository: Repository<Finger>,
  ) {}
}
