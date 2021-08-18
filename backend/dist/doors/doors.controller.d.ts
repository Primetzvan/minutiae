import { DoorsService } from "./doors.service";
import { CreateDoorDto } from "./dto/create-door.dto";
export declare class DoorsController {
    private readonly doorsService;
    constructor(doorsService: DoorsService);
    findAll(req: any): Promise<import("./entities/door.entity").Door[]>;
    findOne(uuid: string): Promise<import("./entities/door.entity").Door>;
    create(createDoorDto: CreateDoorDto): Promise<import("./entities/door.entity").Door>;
    update(uuid: string, createDoorDto: CreateDoorDto): Promise<import("./entities/door.entity").Door>;
    delete(uuid: string): Promise<import("./entities/door.entity").Door>;
}
