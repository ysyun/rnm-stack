import { Controller, Get } from '@nestjs/common';

import { DashboardApiAppService } from '@rnm/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: DashboardApiAppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
