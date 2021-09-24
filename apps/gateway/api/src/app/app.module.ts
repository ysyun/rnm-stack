import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { GatewayApiAppService } from '@rnm/domain';
import { PrismaClientService } from '@rnm/shared';

import { AppController } from './app.controller';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: [
        '/api/gateway*', '/api/dashboard*',
        '/dashboard*', '/configuration*', '/back-office*'
      ],
    }),
    DashboardModule
  ],
  controllers: [AppController],
  providers: [GatewayApiAppService, PrismaClientService]
})
export class AppModule { }
