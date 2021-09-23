import * as fs from "fs";
import { join } from 'path';
import { GatewayConfiguration, MicroServiceConfiguration } from "./config.model";

export const loadMicroServiceConfiguration = (message = '[LOAD] config.json file'): MicroServiceConfiguration => {
  console.log(`${message}:`, `${__dirname}/public/config.json`);
  const jsonFile = fs.readFileSync(join(__dirname, 'public', 'config.json'), 'utf8');
  return JSON.parse(jsonFile);
}

export const loadGatewayConfiguration = (message = '[LOAD] config.json file'): GatewayConfiguration => {
  console.log(`${message}:`, `${__dirname}/public/config.json`);
  const jsonFile = fs.readFileSync(join(__dirname, 'public', 'config.json'), 'utf8');
  return JSON.parse(jsonFile);
}
