import { Test, TestingModule } from '@nestjs/testing';
import { PlansService } from './plans.service';

describe('PlansService', () => {
  let service: PlansService;

  beforeEach(async () => {  
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PlansService],
    }).compile();

    service = moduleRef.get<PlansService>(PlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
