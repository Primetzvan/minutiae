import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { Public } from '../auth/constants';

@Controller('fingers')
export class FingersController {
  @Get(':user_id')
  findOne(@Param('user_id') user_id: string) {
    return `This action returns the id of the finger`;
  }

  @Post(':userId')
  create(@Body() fingerId: string) {
    return fingerId;
    // return `This action creates a user`;
  }

  // FRITZ Schnittstelle
  // Man muss nicht eingeloggt sein um auf diese zuzugreifen (passt so?) TODO
  @Public()
  @Post('/match/:userId')
  match(@Body() body) {
    // log in db
    return 'success';
  }

  @Delete(':userId')
  remove(@Param('user_id') user_id: string) {
    return `This action removes the finger finger of user ${user_id}`;
  }
}
