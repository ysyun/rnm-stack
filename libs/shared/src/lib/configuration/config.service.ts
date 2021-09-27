import * as fs from "fs";
import { join } from 'path';
import { GatewayConfiguration, MicroServiceConfiguration, OrmConfiguration } from "./config.model";

export const loadConfigJson = (message = '[LOAD] config.json file'): MicroServiceConfiguration | GatewayConfiguration => {
  console.log(`${message}:`, `${__dirname}/environments/config.json`);
  const jsonFile = fs.readFileSync(join(__dirname, 'environments', 'config.json'), 'utf8');
  return JSON.parse(jsonFile);
}

export const loadOrmConfiguration = (message = '[LOAD] orm-config.json file'): OrmConfiguration => {
  console.log(`${message}:`, `${__dirname}/environments/orm-config.json`);
  const jsonFile = fs.readFileSync(join(__dirname, 'environments', 'orm-config.json'), 'utf8');
  return JSON.parse(jsonFile);
}
