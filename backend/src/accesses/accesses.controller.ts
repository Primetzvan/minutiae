import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { CreateAccessDto } from '../users/dto/create-access.dto';
import { UsersService } from '../users/users.service';

@Controller('accesses')
export class AccessesController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createAccess(@Body() createAccessDto: CreateAccessDto) {
    return this.userService.addAccess(createAccessDto);
  }

  @Delete()
  deleteAccess(@Query() ids: CreateAccessDto) {
    return this.userService.removeAccess(ids);
  }
}
