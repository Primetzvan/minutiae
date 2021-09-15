import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { Door } from '../doors/entities/door.entity';
import { CreateAccessDto } from './dto/create-access.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly doorRepository;
    constructor(userRepository: UserRepository, doorRepository: Repository<Door>);
    findAll(): Promise<User[]>;
    findOneById(id: string): Promise<User>;
    findOne(usernameormail: string): Promise<User | undefined>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    generateHash(password: string): Promise<string>;
    remove(id: string): Promise<User>;
    addAccess(createAccessDto: CreateAccessDto): Promise<User>;
    removeAccess(createAccessDto: CreateAccessDto): Promise<void>;
}
