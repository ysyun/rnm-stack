import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';

import { BackOfficeApiAppService } from '@rnm/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: BackOfficeApiAppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern({ cmd: 'back-office-sum' })
  accumulate(data: number[]): Observable<number> {
    console.log('calling sum from back-office....');
    const sum = data[0] + data[1] + data[2];
    return from([sum]);
  }
}
