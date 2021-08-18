import { AuthService } from './auth/auth.service';
import { Response } from 'express';
import { ConfigService } from "@nestjs/config";
export declare class AppController {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    login(response: Response, req: any): Promise<{
        msg: string;
    }>;
    getProfile(req: any): any;
}
