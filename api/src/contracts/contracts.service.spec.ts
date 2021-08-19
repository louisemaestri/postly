import { Test, TestingModule } from '@nestjs/testing';
import { ContractsService } from './contracts.service';

describe('ContractsService', () => {
  let service: ContractsService;

  beforeEach(async () => {  
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [ContractsService],
    }).compile();

    service = moduleRef.get<ContractsService>(ContractsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
