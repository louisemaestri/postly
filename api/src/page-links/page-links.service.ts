import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PagesService } from 'src/pages/pages.service';
import { CreatePageLinkDto } from './dtos/create-page-link.dto';
import { PageLink } from './entities/page-link.entity';

@Injectable()
export class PageLinksService {
  constructor(
    @InjectModel(PageLink)
    private readonly linkModel: typeof PageLink,
    private readonly pagesServices: PagesService
  ) {}

  async create(createPageLinkDto: CreatePageLinkDto): Promise<PageLink> {
    const page = await this.pagesServices.findOne(createPageLinkDto.pageId);


    const link = new PageLink();
    link.title = createPageLinkDto.title;
    link.url = createPageLinkDto.url;
    link.position = createPageLinkDto.position;
    link.context = createPageLinkDto.context;
    link.pageId = page.id;

    return link.save();
  }

  async findAll(): Promise<PageLink[]> {
    return this.linkModel.findAll();
  }

  findOne(id: string): Promise<PageLink> {
    return this.linkModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const link = await this.findOne(id);
    await link.destroy();
  }
}