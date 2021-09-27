import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { loadConfigJson, MicroServiceConfiguration } from '@rnm/shared';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Load config.json file
  const config: MicroServiceConfiguration = loadConfigJson();

  // // Setup tcp server for api
  const options: MicroserviceOptions = {
    transport: Transport.TCP,
    options: { host: config.TCP_HOST, port: config.TCP_PORT || 8100 }
  };
  app.connectMicroservice(options);
  app.startAllMicroservices();

  // // Setup http server for web
  const httpPort = config.HTTP_PORT || process.env.HTTP_PORT || 8001;
  const globalPrefix = config.GLOBAL_API_PREFIX || '/api';
  app.setGlobalPrefix(globalPrefix);
  await app.listen(httpPort, () => {
    Logger.log(`Listening at http://localhost:${httpPort}${globalPrefix}`);
  });
}

bootstrap();
