import { Request } from 'express';

import { TokenPayload } from '@rnm/model';

export interface RequestWithUser extends Request {
  user: TokenPayload;
}
