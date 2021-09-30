import { Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';

import { AuthService, JwtAuthGuard, LocalAuthGuard, JwtRefreshGuard, RequestWithUser, UserService } from '@rnm/domain';
import { TokenPayload } from '@rnm/model';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser): Promise<any> {
    const { user } = req;
    if (user) {
      const payload: TokenPayload = { username: user.username, sub: user.id, email: user.email, role: user.role };
      const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(payload);
      const {
        cookie: refreshTokenCookie,
        token: refreshToken
      } = this.authService.getCookieWithJwtRefreshToken(payload);
      const loginUsernameCookie = this.authService.getCookieWithLoginUsername(payload);

      await this.userService.setCurrentRefreshToken(refreshToken, user.id);

      // 반드시 req.res로 쿠키를 설정해야 한다.
      req.res.setHeader('Set-Cookie', [...accessTokenCookie, refreshTokenCookie, loginUsernameCookie]);
      return {
        payload,
        accessTokenCookie,
        refreshTokenCookie
      };
    } else {
      throw new UnauthorizedException({
        error: 'User does not exist'
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: RequestWithUser, @Res() res): Promise<any> {
    await this.userService.removeRefreshToken(req.user.id);
    res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() req: RequestWithUser) {
    const user = req.user;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user);

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
