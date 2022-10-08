import { Body, Controller, Delete, Param, Patch, Post, Req, Request } from "@nestjs/common";
import { CreateAccessDto, UpdateAccessDto } from "../users/dto/create-access.dto";
import { UsersService } from '../users/users.service';

@Controller('accesses')
export class AccessesController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  // delete all and array empfangen
  renewAccesses(@Body() createAccessDto: CreateAccessDto, @Req() req) {
    return this.userService.addOrRemoveAccess(createAccessDto, req.user);
  }

  @Patch()
  // delete all and array empfangen
  updateAccessExpireDate(@Body() updateAccessDto: UpdateAccessDto, @Req() req) {
    return this.userService.updateAccessExpireDate(updateAccessDto, req.user);
  }

  @Delete(':id')
  deleteAccess(@Param('id') id: string, @Request() req) {
    console.log(id);
    return this.userService.removeAccess(id, req.user);
  }

  /*@Delete()
  deleteAccess(@Query() ids: CreateAccessDto, @Req() req) {
    return this.userService.removeAccess(ids, req.user);
  }*/
}
