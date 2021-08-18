import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorsService } from './doors.service';
import { DoorsController } from './doors.controller';
import { Door } from './entities/door.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Door])],
  providers: [DoorsService],
  controllers: [DoorsController],
  exports: [DoorsService],
})
export class DoorsModule {}
