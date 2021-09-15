import { AuthService } from './auth/auth.service';
import { Response } from 'express';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(response: Response, req: any): Promise<{
        userId: any;
    }>;
    logout(): string;
    getProfile(req: any): any;
}
