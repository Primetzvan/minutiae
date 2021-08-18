import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./repositories/user.repository";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findAll(): Promise<User[]>;
    findOneById(id: string): Promise<User>;
    findOne(usernameormail: string): Promise<User | undefined>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    generateHash(password: string): Promise<string>;
    remove(id: string): Promise<User>;
}
