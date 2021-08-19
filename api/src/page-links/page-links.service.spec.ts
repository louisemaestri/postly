import { Test, TestingModule } from '@nestjs/testing';
import { PageLink } from './entities/page-link.entity';
import { PageLinksService } from './page-links.service';

describe('PageLinksService', () => {
  let service: PageLinksService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PageLinksService],
    }).compile();

    service = moduleRef.get<PageLinksService>(PageLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it.each`
    name      | returnVal
    ${'john'} | ${{ linkId: 1, email: 'john', password: 'changeme' }}
  `(
    'should call findOne for $name and return $returnVal',
    async ({ name, returnVal }: { name: string; returnVal: PageLink }) => {
      expect(await service.findOne(name)).toEqual(returnVal);
    },
  );
});
