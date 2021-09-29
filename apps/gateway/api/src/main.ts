import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';

import { GatewayConfiguration, loadConfigJson } from '@rnm/shared';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // http security checker
  // https://github.com/helmetjs/helmet#how-it-works
  app.use(helmet());
  app.use(cookieParser());

  // Load config.json file
  const config: GatewayConfiguration = loadConfigJson();

  const httpPort = config.HTTP_PORT || process.env.HTTP_PORT || 8000;
  await app.listen(httpPort, () => {
    Logger.log(`Listening at http://localhost:${httpPort}`);
  });
}

bootstrap();
