/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestMiddleware, Logger } from '@nestjs/common';
import { GatewayConfiguration, loadConfigJson } from '@rnm/shared';
import { createProxyMiddleware } from 'http-proxy-middleware';

export class BackOfficeReverseProxyMiddleware implements NestMiddleware {
  private config: GatewayConfiguration = loadConfigJson();
  private proxyOptions = {
    target: this.config.BACK_OFFICE.REVERSE_ADDRESS,
    ws: true,
    secure: false,
    onProxyReq: (proxyReq: any, req: any, res: any) => {
      Logger.debug(`[BackOfficeReverseProxyMiddleware]: Proxying ${req.method} request originally made to '${req.url}'`);
    },
  };
  private proxy: any = createProxyMiddleware(this.proxyOptions);

  use(req: any, res: any, next: () => void) {
    this.proxy(req, res, next);
  }
}
