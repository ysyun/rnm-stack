import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { GatewayConfiguration, loadConfigJson } from '@rnm/shared';

import { DashboardController } from '../dashboard.controller';
import { DashboardReverseProxyMiddleware } from './dashboard-proxy.middleware';
import { DashboardService } from '../dashboard.service';

const config: GatewayConfiguration = loadConfigJson();

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
