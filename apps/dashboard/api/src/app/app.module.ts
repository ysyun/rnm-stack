import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { DashboardApiAppService } from '@rnm/domain';

import { AppController } from './app.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api*'],
    })
  ],
  controllers: [AppController],
  providers: [DashboardApiAppService],
})
export class AppModule { }
