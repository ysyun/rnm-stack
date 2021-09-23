import { Controller, Get } from '@nestjs/common';

import { GatewayApiAppService } from '@rnm/domain';

@Controller('api/gateway')
export class AppController {
  constructor(private readonly appService: GatewayApiAppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
