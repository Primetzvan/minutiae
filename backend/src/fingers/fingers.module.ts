import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finger } from './entities/finger.entity';
import { FingersService } from './fingers.service';
import { FingersController } from './fingers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Finger])],
  providers: [FingersService],
  controllers: [FingersController],
  exports: [FingersService],
})
export class FingersModule {}
