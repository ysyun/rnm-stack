import { Test } from '@nestjs/testing';

import { GatewayApiAppService } from './gateway-api-app.service';

describe('GatewayApiAppService', () => {
  let service: GatewayApiAppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [GatewayApiAppService],
    }).compile();

    service = app.get<GatewayApiAppService>(GatewayApiAppService);
  });

  describe('getData', () => {
    it('should return "Welcome to gateway/api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to gateway/api!' });
    });
  });
});
