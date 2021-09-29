import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { loadConfigJson } from '@rnm/shared';

const config: any = loadConfigJson();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.LOGIN_TOKEN;
      }]),
      ignoreExpiration: false,
      secretOrKey: config?.AUTH?.SECRET
    });
  }

  async validate(user: any): Promise<any> {
    // return { id: payload.sub, username: payload.username };
    return user;
  }
}

