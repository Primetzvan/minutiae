import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finger } from './entities/finger.entity';
import { FingersService } from './fingers.service';
import { FingersController } from './fingers.controller';
import { User } from '../users/entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Finger, User]),
    ClientsModule.register([
      {
        name: 'MQ_CLIENT',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883'
        },
      },
    ]),
  ],
  providers: [FingersService],
  controllers: [FingersController],
  exports: [FingersService],
})
export class FingersModule {}
