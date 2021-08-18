import { Module } from '@nestjs/common';
import { AccessesService } from './accesses.service';
import { AccessesController } from './accesses.controller';

@Module({
  imports: [],
  providers: [AccessesService],
  controllers: [AccessesController],
  exports: [AccessesService],
})
export class AccessesModule {}
