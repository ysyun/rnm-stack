import { join } from 'path';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthMiddleware, ConfigurationApiAppService } from '@rnm/domain';
import { LoggerMiddleware } from '@rnm/shared';

import { AppController } from './app.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api*', '/configuration/api*'],
    })
  ],
  controllers: [AppController],
  providers: [ConfigurationApiAppService],
})
export class AppModule implements NestModule {
  // middleware 적용
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
