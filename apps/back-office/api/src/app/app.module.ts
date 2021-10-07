import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import { AuthMiddleware, BackOfficeApiAppService, EntitiesModule } from '@rnm/domain';
import { GlobalExceptionFilter, LoggerMiddleware, ormConfigService, TranslaterModule } from '@rnm/shared';

import { environment } from '../environments/environment';
import { AppController } from './app.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api*', '/dashboard/api*'],
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
  ],
  controllers: [AppController],
  providers: [
    BackOfficeApiAppService,
    // Global Exception Filter
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  // middleware 적용
  configure(consumer: MiddlewareConsumer) {
    if(!environment || !environment.production) {
      return;
    }
    
    consumer
      .apply(AuthMiddleware, LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
