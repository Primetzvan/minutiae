import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorsService } from './doors.service';
import { DoorsController } from './doors.controller';
import { Door } from './entities/door.entity';
import { LogsModule } from '../logs/logs.module';
import { Access } from '../accesses/entities/access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Door, Access]), LogsModule],
  providers: [DoorsService],
  controllers: [DoorsController],
  exports: [DoorsService],
})
export class DoorsModule {}
