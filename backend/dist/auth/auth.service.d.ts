import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(usernameormail: string, pass: string): Promise<any>;
    login(user: any): Promise<string>;
    getRefreshToken(user: User): Promise<string>;
    validateRefreshToken(username: string, refreshToken: string): Promise<User>;
}
