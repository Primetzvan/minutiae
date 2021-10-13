import { Controller, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, MqttContext, Payload } from "@nestjs/microservices";
import { FingersService } from '../fingers/fingers.service';
import { EnrollFinished, Match } from './dto/dtos.entity';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/constants';

@Controller('mqtt')
@UseGuards(JwtAuthGuard)
@Public()
export class MqttController {
  constructor(
    private readonly fingersService: FingersService,
    private readonly usersService: UsersService,
    @Inject('MQ_CLIENT') private client: ClientProxy,
  ) {
    client.connect();
  }

  @MessagePattern('MATCH')
  async match(@Payload() data: Match) {
    // TODO: matches in logging table speichern
    // TODO: button:true implementieren

    // sudo mosquitto_pub -h localhost -p 1883 -t MATCH -m '{ "pattern": "MATCH", "data": { "externalFingerId": "asdf", "score": 1, "button": "true" } }'
    const user = await this.fingersService.getUserByExternalFingerId(
      data.externalFingerId,
    );

    if (await this.usersService.hasAccess(user)) {
      this.client.emit('UNLOCK', { keepOpen: false });
    } else {
      console.log('no entry');
    }
  }

  // sudo mosquitto_pub -h localhost -p 1883 -t ENROLL_FINISHED -m '{ "pattern": "ENROLL_FINISHED", "data": { "externalFingerId": "asdf", "success": "true" } }'
  @MessagePattern('ENROLL_FINISHED')
  enroll_finished(@Payload() data: EnrollFinished, @Ctx() context: MqttContext) {
    this.fingersService.changeStatus(data);
  }
}
