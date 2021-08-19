import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards, UseInterceptors
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";


@Controller('users')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Get()
  async findAll(@Req() req) {
    return this.userService.findAll();
  }

  @Get(':uuid')
  // can be number cuz validation pipe
  findOne(@Param('uuid') uuid: string) {
    return this.userService.findOneById(uuid);
  }

  @Get(':id')
  logout(@Param('id') id: string) {
    return `This action returns #${id} user`;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
