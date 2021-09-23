import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { loadGatewayConfiguration } from '@rnm/shared';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Load config.json file
  const config = loadGatewayConfiguration();

  const httpPort = config.HTTP_PORT || process.env.HTTP_PORT || 8000;
  await app.listen(httpPort, () => {
    Logger.log(`Listening at http://localhost:${httpPort}`);
  });
}

bootstrap();
