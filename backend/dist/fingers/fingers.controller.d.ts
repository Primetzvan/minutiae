import { FingersService } from "./fingers.service";
import { CreateFingerDto } from "./dto/create-finger.entity";
export declare class FingersController {
    private readonly fingersService;
    constructor(fingersService: FingersService);
    create(createFingerDto: CreateFingerDto): Promise<import("../users/entities/user.entity").User>;
    match(body: any): string;
    remove(userId: string): Promise<import("./entities/finger.entity").Finger>;
}
