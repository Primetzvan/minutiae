import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get, HttpException, HttpStatus,
  Param,
  Patch,
  Post,
  Query, Req,
  UseInterceptors
} from "@nestjs/common";
import { DoorsService } from "./doors.service";
import { CreateDoorDto } from "./dto/create-door.dto";

@Controller('doors')
@UseInterceptors(ClassSerializerInterceptor)
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {
  }

  @Get()
  async findAll(@Req() req) {
    return this.doorsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.doorsService.findOneById(uuid);
  }

  @Post()
  create(@Body() createDoorDto: CreateDoorDto) {
    return this.doorsService.create(createDoorDto);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() createDoorDto: CreateDoorDto) {
    return this.doorsService.update(uuid, createDoorDto);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string) {
    return this.doorsService.remove(uuid);
  }
}
