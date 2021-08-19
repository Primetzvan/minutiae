import { CreateAccessDto } from '../users/dto/create-access.dto';
import { UsersService } from '../users/users.service';
export declare class AccessesController {
    private readonly userService;
    constructor(userService: UsersService);
    createAccess(createAccessDto: CreateAccessDto): Promise<import("../users/entities/user.entity").User>;
    deleteAccess(ids: CreateAccessDto): Promise<void>;
}
