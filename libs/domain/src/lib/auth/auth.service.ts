/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../entities/user/user.model';
import { UserService } from '../entities/user/user.service';
import { bcryptCompare } from '../utilties/bcrypt.util';

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

  async login(loginUser: User): Promise<any> {
    const user = await this.userService.findOne(loginUser.username);
    if (user) {
      const payload = { username: user.username, sub: user.id, email: user.email, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException({
        error: 'There is no user'
      });
    }
  }
}
