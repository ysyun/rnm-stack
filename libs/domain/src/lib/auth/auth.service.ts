/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenPayload } from '@rnm/model';
import { bcryptCompare, loadConfigJson } from '@rnm/shared';

import { UserService } from '../entities/user/user.service';

const config: any = loadConfigJson();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user: any = await this.userService.findOne(username) || {};
    const isMatch = await bcryptCompare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  getCookieWithJwtAccessToken(payload: TokenPayload, hasAuthorization = false) {
    const token = this.jwtService.sign(payload, {
      secret: config?.AUTH?.SECRET || 'iot_app',
      expiresIn: config?.AUTH?.EXPIRED_ON || '1d'
    });
    if (hasAuthorization) {
      return [`LOGIN_TOKEN=${token}; HttpOnly; Path=/; Max-Age=${config?.AUTH?.EXPIRED_ON}`, `Authorization=${token}; HttpOnly; Path=/; Max-Age=${config?.AUTH?.EXPIRED_ON}`];
    } else {
      return [`LOGIN_TOKEN=${token}; HttpOnly; Path=/; Max-Age=${config?.AUTH?.EXPIRED_ON}`];
    }
  }

  getCookieWithJwtRefreshToken(payload: TokenPayload) {
    const token = this.jwtService.sign(payload, {
      secret: config?.AUTH?.REFRESH_SECRET || 'io_app_refresh',
      expiresIn: config?.AUTH?.REFRESH_EXPIRED_ON || '7d'
    });
    const cookie = `REFRESH_LOGIN_TOKEN=${token}; HttpOnly; Path=/; Max-Age=${config?.AUTH?.REFRESH_EXPIRED_ON}`;
    return {
      cookie,
      token
    }
  }

  getCookieWithLoginUsername(payload: TokenPayload) {
    return `LOGIN_USER_ID=${payload.username}; HttpOnly; Path=/; Max-Age=${config?.AUTH?.REFRESH_EXPIRED_ON}`;
  }

  getCookiesForLogOut() {
    return [
      'LOGIN_TOKEN=; HttpOnly; Path=/; Max-Age=0',
      'Authorization=; HttpOnly; Path=/; Max-Age=0',
      'REFRESH_LOGIN_TOKEN=; HttpOnly; Path=/; Max-Age=0',
      'LOGIN_USER_ID=; HttpOnly; Path=/; Max-Age=0'
    ];
  }
}
