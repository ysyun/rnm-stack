import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { UserService } from '@rnm/domain';
import { loadConfigJson } from '@rnm/shared';
import { TokenPayload, User } from '@rnm/model';

const config: any = loadConfigJson();

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.REFRESH_LOGIN_TOKEN;
      }]),
      secretOrKey: config?.AUTH?.REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload): Promise<User | undefined> {
    const refreshToken = request.cookies?.REFRESH_LOGIN_TOKEN;
    return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.id as number);
  }
}
