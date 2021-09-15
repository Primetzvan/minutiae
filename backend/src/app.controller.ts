import { Controller, Get, Request, Post, UseGuards, Res, Req, Param } from "@nestjs/common";
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/constants';
import { Response } from 'express';
import { nanoid } from 'nanoid';
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";

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
    const access = await this.authService.login(req.user);
    const refresh_token = await this.authService.getRefreshToken(req.user);

    response.cookie('ACCESS_TOKEN_COOKIE', access.token, {
      httpOnly: true,
    });

    response.cookie('REFRESH_TOKEN_COOKIE', refresh_token, {
      httpOnly: true,
    });

    return { userId: access.userId };
  }

  @Get('auth/logout')
  logout() {
    return 'logout';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  /*@Get('refresh')
  @UseGuards(AuthGuard('refresh'))
  async regenerateTokens(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.getJwtToken(req.user);
    const refreshToken = await this.authService.getRefreshToken(
      req.user.userId,
    );
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return { msg: 'success' };
  }*/
}
