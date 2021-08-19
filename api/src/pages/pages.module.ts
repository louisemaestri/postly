import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Page } from './entities/page.entity';
import { PagesService } from './pages.service';

@Module({
  imports: [SequelizeModule.forFeature([Page])],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}
