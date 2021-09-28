import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';

import { ConfigurationApiAppService } from '@rnm/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: ConfigurationApiAppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern({ cmd: 'configuration-sum' })
  accumulate(data: number[]): Observable<number> {
    console.log('calling sum from configuration....');
    const sum = data[0] + data[1] + data[2];
    return from([sum]);
  }
}
