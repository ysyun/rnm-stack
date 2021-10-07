import { join } from 'path';
import { Module } from '@nestjs/common';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';

import { loadConfigJson } from '@rnm/shared';

import { TranslaterService } from './translater.service';

// Load config.json file
const config: any = loadConfigJson();

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: config.I18N_LANG || 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: join(__dirname, config.I18N_JSON_PATH || '/assets/i18n/'),
      },
    })
  ],
  providers: [TranslaterService],
  exports: [TranslaterService]
})
export class TranslaterModule { }
