import { Injectable } from '@nestjs/common';

@Injectable()
export class BackOfficeApiAppService {
  getData(): { message: string } {
    return { message: 'Welcome to back-office/api in libs' };
  }
}
