import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { GatewayConfiguration, loadConfigJson } from '@rnm/shared';

import { BackOfficeController } from '../back-office.controller';
import { BackOfficeReverseProxyMiddleware } from './back-office-proxy.middleware';
import { BackOfficeService } from '../back-office.service';

const config: GatewayConfiguration = loadConfigJson();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "BACK-OFFICE",
        transport: Transport.TCP,
        options: {
          host: config.BACK_OFFICE.TCP_HOST,
          port: config.BACK_OFFICE.TCP_PORT
        }
      }
    ])
  ],
  controllers: [BackOfficeController],
  providers: [BackOfficeService],
})
export class BackOfficeModule implements NestModule {
  // middleware 적용
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BackOfficeReverseProxyMiddleware)
      .forRoutes({ path: config.BACK_OFFICE.REVERSE_CONTEXT, method: RequestMethod.ALL });
  }
}
