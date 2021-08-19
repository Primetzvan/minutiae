import { Repository } from 'typeorm';
import { Finger } from './entities/finger.entity';
import { User } from "../users/entities/user.entity";
import { CreateFingerDto } from "./dto/create-finger.entity";
export declare class FingersService {
    private readonly fingerRepository;
    private readonly userRepository;
    constructor(fingerRepository: Repository<Finger>, userRepository: Repository<User>);
    create(createFingerDto: CreateFingerDto): Promise<User>;
    remove(userId: string): Promise<Finger>;
}
