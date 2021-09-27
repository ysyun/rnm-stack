import { Test } from '@nestjs/testing';

import { DashboardApiAppService } from './dashboard-api-app.service';

describe('DashboardApiAppService', () => {
  let service: DashboardApiAppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [DashboardApiAppService],
    }).compile();

    service = app.get<DashboardApiAppService>(DashboardApiAppService);
  });

  describe('getData', () => {
    it('should return "Welcome to dashboard/api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to dashboard/api!' });
    });
  });
});
