/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { loadOrmConfiguration } from './config.service';

class OrmConfigService {
  constructor(private env: { [k: string]: any }) { }

  ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  getPort() {
    return this.getValue('PORT', true);
  }

  isProduction() {
    const mode = this.getValue('MODE', false);
    return mode !== 'dev';
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.getValue('HOST'),
      port: parseInt(this.getValue('PORT')),
      username: this.getValue('USER'),
      password: this.getValue('PASSWORD'),
      database: this.getValue('DATABASE'),
      entities: this.getValue('ENTITIES'),
      synchronize: this.getValue('SYNC'),
      // migrationsTableName: 'migration',
      // migrations: ['src/migration/*.ts'],
      // cli: {
      //   migrationsDir: 'src/migration',
      // },
      // ssl: this.isProduction(),
    };
    return config;
  }

  private getValue(key: string, throwOnMissing = true): any {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing orm-config.${key}`);
    }

    return value;
  }

}

/**
 * Singleton Config
 */
const ormEnv: any = loadOrmConfiguration();
let ormConfigService: any;
if (ormEnv) {
  ormConfigService = new OrmConfigService(ormEnv)
    .ensureValues([
      'HOST',
      'PORT',
      'USER',
      'PASSWORD',
      'DATABASE'
    ]);
}

export { ormConfigService };
