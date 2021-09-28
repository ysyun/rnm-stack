import { join } from 'path';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import { GatewayApiAppService, EntitiesModule, AuthModule } from '@rnm/domain';
import { GlobalExceptionFilter, ormConfigService } from '@rnm/shared';

import { DashboardModule } from './dashboard/microservice/dashboard.module';
import { ConfigurationModule } from './configuration/microservice/configuration.module';
import { BackOfficeModule } from './back-office/microservice/back-office.module';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: [
        '/auth/*',
        '/api/gateway*', '/api/dashboard*', '/api/configuration*', '/api/back-office*',
        '/dashboard*', '/configuration*', '/back-office*'
      ],
    }),
    // ORM
    TypeOrmModule.forRoot({
      ...ormConfigService.getTypeOrmConfig(),
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target)
    }),
    EntitiesModule,
    // MicroService
    DashboardModule,
    ConfigurationModule,
    BackOfficeModule,
    // Auth
    AuthModule
  ],
  controllers: [
    AppController,
    AuthController,
    UserController
  ],
  providers: [
    GatewayApiAppService,
    // Global Exception Filter
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ]
})
export class AppModule { }
