import { ExecutionContext } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from '../users/users.service';
declare const CustomAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class CustomAuthGuard extends CustomAuthGuard_base {
    private readonly authService;
    private readonly userService;
    private logger;
    constructor(authService: AuthService, userService: UsersService);
    activate(context: ExecutionContext): Promise<boolean>;
    handleRequest(err: any, user: any): any;
}
export {};
