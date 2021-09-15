import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finger } from './entities/finger.entity';
import { FingersService } from './fingers.service';
import { FingersController } from './fingers.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Finger, User])],
  providers: [FingersService],
  controllers: [FingersController],
  exports: [FingersService],
})
export class FingersModule {}
