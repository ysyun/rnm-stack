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
  GLOBAL_API_PREFIX?: string;
  DASHBOARD?: MicroServiceConfiguration;
  CONFIGURATION?: MicroServiceConfiguration;
  BACK_OFFICE?: MicroServiceConfiguration;
}
