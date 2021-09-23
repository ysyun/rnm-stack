import { Controller, Get } from '@nestjs/common';

import { Observable } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Controller('api/dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService
  ) { }

  @Get('sum')
  accumulate(): Observable<{ message: number, duration: number }> {
    return this.dashboardService.sum();
  }
}
