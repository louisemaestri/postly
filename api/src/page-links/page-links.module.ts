import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Page } from 'src/pages/entities/page.entity';
import { PagesService } from 'src/pages/pages.service';
import { PageLink } from './entities/page-link.entity';
import { PageLinksService } from './page-links.service';

@Module({
  imports: [SequelizeModule.forFeature([PageLink, Page])],
  providers: [PageLinksService, PagesService],
  exports: [PageLinksService, PagesService],
})
export class PageLinksModule {}
