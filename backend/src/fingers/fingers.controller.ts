import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { Public } from '../auth/constants';
import { FingersService } from "./fingers.service";
import { CreateFingerDto } from "./dto/create-finger.entity";

@Controller('fingers')
export class FingersController {
  constructor(private readonly fingersService: FingersService) {}

  @Post()
  create(@Body() createFingerDto: CreateFingerDto) {
    return this.fingersService.create(createFingerDto);
  }

  // FRITZ Schnittstelle
  // Man muss nicht eingeloggt sein um auf diese zuzugreifen (passt so?) TODO: nein
  @Public()
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
