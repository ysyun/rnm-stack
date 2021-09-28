import { join } from 'path';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { BackOfficeApiAppService } from '@rnm/domain';
import { LoggerMiddleware } from '@rnm/shared';

import { AppController } from './app.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api*', '/back-office/api*'],
    })
  ],
  controllers: [AppController],
  providers: [BackOfficeApiAppService],
})
export class AppModule implements NestModule {
  // middleware 적용
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
