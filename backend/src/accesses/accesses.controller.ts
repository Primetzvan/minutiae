import { Body, Controller, Delete, Post, Query, Req } from "@nestjs/common";
import { CreateAccessDto } from '../users/dto/create-access.dto';
import { UsersService } from '../users/users.service';

@Controller('accesses')
export class AccessesController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createAccess(@Body() createAccessDto: CreateAccessDto, @Req() req) {
    return this.userService.addAccess(createAccessDto, req.user);
  }

  @Delete()
  deleteAccess(@Query() ids: CreateAccessDto, @Req() req) {
    return this.userService.removeAccess(ids, req.user);
  }
}
