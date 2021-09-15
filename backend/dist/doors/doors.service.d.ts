import { Repository } from 'typeorm';
import { Door } from './entities/door.entity';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';
import * as JSZip from 'jszip';
export declare class DoorsService {
    private readonly doorRepository;
    constructor(doorRepository: Repository<Door>);
    findAll(): Promise<Door[]>;
    findOneById(uuid: string): Promise<Door>;
    create(createDoorDto: CreateDoorDto): Promise<Door>;
    update(uuid: string, updateDoorDto: UpdateDoorDto): Promise<Door>;
    remove(uuid: string): Promise<Door>;
    createZipRepo(createDoorDto: CreateDoorDto): Promise<JSZip>;
    generateFolders(createDoorDto: CreateDoorDto, zip: JSZip): Promise<void>;
    generateSpecificDoorFile(doorname: string, ip: string, allDoorIps: string, zip: JSZip): void;
}
