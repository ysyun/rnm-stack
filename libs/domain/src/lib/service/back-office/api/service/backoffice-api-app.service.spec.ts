import { Test } from '@nestjs/testing';

import { BackOfficeApiAppService } from './backoffice-api-app.service';

describe('BackOfficeApiAppService', () => {
  let service: BackOfficeApiAppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [BackOfficeApiAppService],
    }).compile();

    service = app.get<BackOfficeApiAppService>(BackOfficeApiAppService);
  });

  describe('getData', () => {
    it('should return "Welcome to back-office/api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to back-office/api!' });
    });
  });
});
