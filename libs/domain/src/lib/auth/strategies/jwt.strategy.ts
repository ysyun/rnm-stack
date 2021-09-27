import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { GatewayConfiguration, loadConfigJson } from '@rnm/shared';

const config: GatewayConfiguration = loadConfigJson();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.AUTH?.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    return { userId: payload.sub, username: payload.username };
  }
}

