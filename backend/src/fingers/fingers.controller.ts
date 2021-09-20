import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import { Public } from '../auth/constants';
import { FingersService } from "./fingers.service";
import { CreateFingerDto } from "./dto/create-finger.entity";
import { ClientProxy } from "@nestjs/microservices";

@Controller('fingers')
export class FingersController {
  constructor(
    private readonly fingersService: FingersService,
    @Inject('MQ_CLIENT') private client: ClientProxy,
  ) {
    client.connect();
  }

  @Post()
  async create(@Body() createFingerDto: CreateFingerDto) {
    const sessionId = await this.fingersService.create(createFingerDto); // returns sessionId from finger

    this.client.emit('ENROLL', {
      run: true,
    }); // enroll: true - start enroll mode (=scan)

    return sessionId;
  }

  @Post('/match/:userId')
  match(@Body() body) {
    // log in db
    return 'success';
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.fingersService.remove(userId);
  }
}
