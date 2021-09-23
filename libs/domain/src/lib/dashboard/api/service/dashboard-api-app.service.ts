import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardApiAppService {
  getData(): { message: string } {
    return { message: 'Welcome to dashboard/api in libs' };
  }
}
