import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayApiAppService {
  getData(): { message: string } {
    return { message: 'Welcome to gateway/api in libs' };
  }
}
