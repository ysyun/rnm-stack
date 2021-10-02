import { Test } from '@nestjs/testing';

import { ConfigurationApiAppService } from './configuration-api-app.service';

describe('ConfigurationApiAppService', () => {
  let service: ConfigurationApiAppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ConfigurationApiAppService],
    }).compile();

    service = app.get<ConfigurationApiAppService>(ConfigurationApiAppService);
  });

  describe('getData', () => {
    it('should return "Welcome to configuration/api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to configuration/api!' });
    });
  });
});
