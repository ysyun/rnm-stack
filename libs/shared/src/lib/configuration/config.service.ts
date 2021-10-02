import * as fs from "fs";
import { join } from 'path';
import { GatewayConfiguration, MicroServiceConfiguration, OrmConfiguration } from "./config.model";

export const loadConfigJson = (message = '[LOAD] config.json file'): MicroServiceConfiguration | GatewayConfiguration => {
  let config: any = process.env.config;
  if (!config) {
    console.log(`${message}:`, `${__dirname}/environments/config.json`);
    const jsonFile = fs.readFileSync(join(__dirname, 'environments', 'config.json'), 'utf8');
    process.env.config = jsonFile;
    config = JSON.parse(jsonFile);
  } else {
    config = JSON.parse(process.env.config as any);
  }
  return config;
}

export const loadOrmConfiguration = (message = '[LOAD] orm-config.json file'): OrmConfiguration => {
  let config: any = process.env.ormConfig;
  if (!config) {
    console.log(`${message}:`, `${__dirname}/environments/orm-config.json`);
    const jsonFile = fs.readFileSync(join(__dirname, 'environments', 'orm-config.json'), 'utf8');
    process.env.ormConfig = jsonFile;
    config = JSON.parse(jsonFile);
  } else {
    config = JSON.parse(process.env.ormConfig as any);
  }
  return config;
}
