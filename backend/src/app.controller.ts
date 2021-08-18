import { Controller, Get, Request, Post, UseGuards, Res } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/constants';
import { Response } from 'express';
import { nanoid } from 'nanoid';
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Res({ passthrough: true }) response: Response, @Request() req) {
    const access_token = await this.authService.login(req.user);
    //const refresh_token = await this.authService.getRefreshToken(req.user);

    response.cookie('ACCESS_TOKEN_COOKIE', access_token, {
      httpOnly: true,
    });

    console.log('Access token: ' + access_token);
    return { msg: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
