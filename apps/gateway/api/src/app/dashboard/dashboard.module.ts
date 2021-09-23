import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { loadGatewayConfiguration } from '@rnm/shared';

import { DashboardController } from './dashboard.controller';
import { DashboardReverseProxyMiddleware } from './dashboard.proxy';
import { DashboardService } from './dashboard.service';

const config = loadGatewayConfiguration();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "DASHBOARD",
        transport: Transport.TCP,
        options: {
          host: config.DASHBOARD.TCP_HOST,
          port: config.DASHBOARD.TCP_PORT
        }
      }
    ])
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule implements NestModule {
  // middleware 적용
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DashboardReverseProxyMiddleware)
      .forRoutes({ path: config.DASHBOARD.REVERSE_CONTEXT, method: RequestMethod.ALL });
  }
}
