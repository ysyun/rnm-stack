/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestMiddleware, Logger } from '@nestjs/common';
import { loadGatewayConfiguration } from '@rnm/shared';
import { createProxyMiddleware } from 'http-proxy-middleware';

export class DashboardReverseProxyMiddleware implements NestMiddleware {
  private config = loadGatewayConfiguration();
  private proxyOptions = {
    target: this.config.DASHBOARD.REVERSE_ADDRESS,
    secure: false,
    onProxyReq: (proxyReq: any, req: any, res: any) => {
      Logger.debug(`[DashboardReverseProxyMiddleware]: Proxying ${req.method} request originally made to '${req.url}'`);
    },
  };
  private proxy: any = createProxyMiddleware(this.proxyOptions);

  use(req: any, res: any, next: () => void) {
    this.proxy(req, res, next);
  }
}
