import { join } from 'path';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import { GatewayApiAppService, EntitiesModule, AuthModule, AuthMiddleware } from '@rnm/domain';
import { GlobalExceptionFilter, ormConfigService, RolesGuard, TranslaterModule } from '@rnm/shared';

import { environment } from '../environments/environment';
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
        '/api/auth*',
        '/api/gateway*', '/api/dashboard*', '/api/configuration*', '/api/back-office*',
        '/dashboard*', '/configuration*', '/back-office*'
      ],
    }),
    // ORM
    TypeOrmModule.forRoot({
      ...ormConfigService.getTypeOrmConfig(),
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target)
    }),
    // i18n
    TranslaterModule,
    // TypeORM
    EntitiesModule,
    // MicroService
    DashboardModule,
    ConfigurationModule,
    BackOfficeModule,
    // Auth
    AuthModule
  ],
  controllers: [
    AuthController,
    AppController,
    UserController
  ],
  providers: [
    GatewayApiAppService,
    // Global Exception Filter
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if(!environment || !environment.production) {
      return;
    }

    consumer
      .apply(AuthMiddleware)
      .forRoutes(...[
        { path: '/dashboard*', method: RequestMethod.ALL },
        { path: '/configuration*', method: RequestMethod.ALL },
        { path: '/back-office*', method: RequestMethod.ALL },
        // { path: '/api/*', method: RequestMethod.ALL },
      ]);
  }
}
