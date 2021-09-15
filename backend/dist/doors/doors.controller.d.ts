import { StreamableFile } from "@nestjs/common";
import { DoorsService } from './doors.service';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';
export declare class DoorsController {
    private readonly doorsService;
    constructor(doorsService: DoorsService);
    findAll(): Promise<import("./entities/door.entity").Door[]>;
    findOne(uuid: string): Promise<import("./entities/door.entity").Door>;
    create(response: any, createDoorDto: CreateDoorDto): Promise<StreamableFile>;
    update(uuid: string, updateDoorDto: UpdateDoorDto): Promise<import("./entities/door.entity").Door>;
    delete(uuid: string): Promise<import("./entities/door.entity").Door>;
}
