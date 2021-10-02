export interface MicroServiceConfiguration {
  REVERSE_CONTEXT?: string;
  REVERSE_ADDRESS?: string;
  HTTP_PORT?: number,
  TCP_HOST?: string;
  TCP_PORT?: number,
  GLOBAL_API_PREFIX?: string;
  AUTH?: AuthConfig;
  I18N_LANG?: string;
  I18N_JSON_PATH?: string;
}

export interface GatewayConfiguration {
  HTTP_PORT?: number,
  DASHBOARD?: MicroServiceConfiguration;
  CONFIGURATION?: MicroServiceConfiguration;
  BACK_OFFICE?: MicroServiceConfiguration;
  AUTH?: AuthConfig;
  I18N_LANG?: string;
  I18N_JSON_PATH?: string;
}

export interface AuthConfig {
  SECRET?: string;
  EXPIRED_ON?: string;
  REFRESH_SECRET?: string;
  REFRESH_EXPIRED_ON?: string;
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
