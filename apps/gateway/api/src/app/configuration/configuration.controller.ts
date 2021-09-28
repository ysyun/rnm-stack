import { Controller, Get } from '@nestjs/common';

import { Observable } from 'rxjs';
import { ConfigurationService } from './configuration.service';

@Controller('api/configuration')
export class ConfigurationController {
  constructor(
    private readonly configurationService: ConfigurationService
  ) { }

  @Get('sum')
  accumulate(): Observable<{ message: number, duration: number }> {
    return this.configurationService.sum();
  }
}
