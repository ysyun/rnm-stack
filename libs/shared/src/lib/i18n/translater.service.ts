import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class TranslaterService {
  constructor(private readonly i18nService: I18nService) { }

  async message(key: string, message: (string | { [k: string]: any; })[] | { [k: string]: any; }): Promise<string> {
    return this.i18nService.translate(`message.${key}`, { args: message });
  }
}
