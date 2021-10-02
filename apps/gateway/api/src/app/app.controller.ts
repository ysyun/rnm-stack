import { Controller, Get } from '@nestjs/common';

import { GatewayApiAppService } from '@rnm/domain';
import { TranslaterService } from '@rnm/shared';

@Controller('api/gateway')
export class AppController {
  constructor(
    private readonly appService: GatewayApiAppService,
    private readonly translater: TranslaterService
  ) { }

  @Get()
  getData() {
    return this.translater.message('USER_NOT_EXIST', { username: 'Peter Yun' });
    // return this.appService.getData();
  }
}
