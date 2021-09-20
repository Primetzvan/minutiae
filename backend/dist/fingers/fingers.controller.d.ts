import { FingersService } from "./fingers.service";
import { CreateFingerDto } from "./dto/create-finger.entity";
import { ClientProxy } from "@nestjs/microservices";
export declare class FingersController {
    private readonly fingersService;
    private client;
    constructor(fingersService: FingersService, client: ClientProxy);
    create(createFingerDto: CreateFingerDto): Promise<any>;
    match(body: any): string;
    remove(userId: string): Promise<import("./entities/finger.entity").Finger>;
}
