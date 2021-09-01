import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  StreamableFile, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { DoorsService } from './doors.service';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';
import { Public } from "../auth/constants";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('doors')
@UseInterceptors(ClassSerializerInterceptor)
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}

  @Get()
  //@UseGuards(JwtAuthGuard)
  //@Public()
  async findAll() {
    return this.doorsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.doorsService.findOneById(uuid);
  }

  @Post()
  async create(@Res() response, @Body() createDoorDto: CreateDoorDto) {
    // generate folders for return (important: it must happen before adding door to db)
    const zip = await this.doorsService.createZipRepo(createDoorDto);
    // add door to db
    await this.doorsService.create(createDoorDto).catch((err) => {
      console.log(err);
      return err;
    });

    // Set header, so that download dialog is automatically opened in frontend
    response.setHeader('Content-Type', 'application/octet-stream');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename="setup.zip"',
    );

    // return config files for door
    return new StreamableFile(await zip.generateAsync({ type: 'nodebuffer' }));
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateDoorDto: UpdateDoorDto) {
    return this.doorsService.update(uuid, updateDoorDto);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string) {
    return this.doorsService.remove(uuid);
  }
}
