import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationApiAppService {
  getData(): { message: string } {
    return { message: 'Welcome to configuration/api in libs' };
  }
}
