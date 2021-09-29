/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { ExtractJwt } from 'passport-jwt';
// import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // private logger = new Logger(JwtAuthGuard.name);

  // constructor(private readonly authService: AuthService) {
  //   super();
  // }

  canActivate(context: ExecutionContext) {
    // const request = context.switchToHttp().getRequest();
    // const response = context.switchToHttp().getResponse();
    // try {
    //   const accessToken = ExtractJwt.fromExtractors([cookieExtractor])(request);
    //   if (!accessToken)
    //     throw new UnauthorizedException('Access token is not set');

    //   const isValidAccessToken = this.authService.validateToken(accessToken);
    //   if (isValidAccessToken) return this.activate(context);

    //   const refreshToken = request.cookies['refreshToken'];
    //   if (!refreshToken)
    //     throw new UnauthorizedException('Refresh token is not set');
    //   const isValidRefreshToken = this.authService.validateToken(refreshToken);
    //   if (!isValidRefreshToken)
    //     throw new UnauthorizedException('Refresh token is not valid');

    //   const user = await this.userService.getByRefreshToken(refreshToken);
    //   const {
    //     accessToken: newAccessToken,
    //     refreshToken: newRefreshToken,
    //   } = this.authService.createTokens(user.id);

    //   await this.userService.updateRefreshToken(user.id, newRefreshToken);

    //   request.cookies[ACCESS_TOKEN_COOKIE_NAME] = newAccessToken;
    //   request.cookies[REFRESH_TOKEN_COOKIE_NAME] = newRefreshToken;

    //   response.cookie(ACCESS_TOKEN_COOKIE_NAME, newAccessToken, COOKIE_OPTIONS);
    //   response.cookie(
    //     REFRESH_TOKEN_COOKIE_NAME,
    //     newRefreshToken,
    //     COOKIE_OPTIONS,
    //   );
    return this.activate(context);
    // } catch (err) {
    //   this.logger.error(err.message);
    //   response.clearCookie(ACCESS_TOKEN_COOKIE_NAME, COOKIE_OPTIONS);
    //   response.clearCookie(REFRESH_TOKEN_COOKIE_NAME, COOKIE_OPTIONS);
    //   return false;
    // }
  }

  async activate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>;
  }

  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
