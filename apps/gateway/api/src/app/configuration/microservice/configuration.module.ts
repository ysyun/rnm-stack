import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { GatewayConfiguration, loadConfigJson } from '@rnm/shared';

import { ConfigurationController } from '../configuration.controller';
import { ConfigurationReverseProxyMiddleware } from './configuration-proxy.middleware';
import { ConfigurationService } from '../configuration.service';

const config: GatewayConfiguration = loadConfigJson();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "CONFIGURATION",
        transport: Transport.TCP,
        options: {
          host: config.CONFIGURATION.TCP_HOST,
          port: config.CONFIGURATION.TCP_PORT
        }
      }
    ])
  ],
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
})
export class ConfigurationModule implements NestModule {
  // middleware 적용
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ConfigurationReverseProxyMiddleware)
      .forRoutes({ path: config.CONFIGURATION.REVERSE_CONTEXT, method: RequestMethod.ALL });
  }
}
