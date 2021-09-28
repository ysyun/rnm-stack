import { Controller, Get } from '@nestjs/common';

import { Observable } from 'rxjs';
import { BackOfficeService } from './back-office.service';

@Controller('api/dashboard')
export class BackOfficeController {
  constructor(
    private readonly backofficeService: BackOfficeService
  ) { }

  @Get('sum')
  accumulate(): Observable<{ message: number, duration: number }> {
    return this.backofficeService.sum();
  }
}
