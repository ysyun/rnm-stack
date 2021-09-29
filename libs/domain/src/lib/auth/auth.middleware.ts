import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { loadConfigJson } from '@rnm/shared';

const config: any = loadConfigJson();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      next();
      return;
    }

    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user;

    if (!bearerHeader || !accessToken) {
      return next();
    }

    try {
      user = verify(
        accessToken,
        config?.AUTH?.SECRET,
      );
    } catch (error) {
      throw new ForbiddenException('Please register or sign in.');
    }

    if (user) {
      req.user = user;
    }
    next();
  }
}
