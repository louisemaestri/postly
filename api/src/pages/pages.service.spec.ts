import { Test, TestingModule } from '@nestjs/testing';
import { Page } from './entities/page.entity';
import { PagesService } from './pages.service';

describe('PagesService', () => {
  let service: PagesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PagesService],
    }).compile();

    service = moduleRef.get<PagesService>(PagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it.each`
    name      | returnVal
    ${'john'} | ${{ pageId: 1, email: 'john', password: 'changeme' }}
  `(
    'should call findOne for $name and return $returnVal',
    async ({ name, returnVal }: { name: string; returnVal: Page }) => {
      expect(await service.findOne(name)).toEqual(returnVal);
    },
  );
});
