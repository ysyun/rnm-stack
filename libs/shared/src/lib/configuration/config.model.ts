export interface MicroServiceConfiguration {
  REVERSE_CONTEXT?: string;
  REVERSE_ADDRESS?: string;
  HTTP_PORT?: number,
  TCP_HOST?: string;
  TCP_PORT?: number,
  GLOBAL_API_PREFIX?: string;
}

export interface GatewayConfiguration {
  HTTP_PORT?: number,
  AUTH?: AuthConfig;
  DASHBOARD?: MicroServiceConfiguration;
  CONFIGURATION?: MicroServiceConfiguration;
  BACK_OFFICE?: MicroServiceConfiguration;
}

export interface AuthConfig {
  secret: string;
  expiredOn?: string;
}

export interface OrmConfiguration {
  HOST: string;
  PORT: number;
  USER: string;
  PASSWORD: string;
  DATABASE: string;
  ENTITIES: string[];
  MODE: string;
  SYNC: boolean;
}
