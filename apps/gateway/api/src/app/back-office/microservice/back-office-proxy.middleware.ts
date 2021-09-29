/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestMiddleware } from '@nestjs/common';
import { GatewayConfiguration, loadConfigJson } from '@rnm/shared';
import { createProxyMiddleware } from 'http-proxy-middleware';

export class BackOfficeReverseProxyMiddleware implements NestMiddleware {
  private config: GatewayConfiguration = loadConfigJson();
  private proxyOptions = {
    target: this.config.BACK_OFFICE.REVERSE_ADDRESS,
    ws: true,
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
    onProxyReq: (proxyReq, req) => {
      Object.keys(req.headers).forEach(function (key) {
        proxyReq.setHeader(key, req.headers[key]);
      });
      if (req.user) {
        const { username, role } = req.user;
        proxyReq.setHeader('username', username);
        proxyReq.setHeader('role', role);

      }
    },
    // onProxyRes: (proxyRes, req, res) => {
    //   Object.keys(proxyRes.headers).forEach(function (key) {
    //     res.append(key, proxyRes.headers[key]);
    //   });
    // }
  };
  private proxy: any = createProxyMiddleware(this.proxyOptions);

  use(req: any, res: any, next: () => void) {
    this.proxy(req, res, next);
  }
}
