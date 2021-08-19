import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ObjectDoesNotExist } from 'src/core/exceptions';
import { schemaToModel } from 'src/core/utils/crud';
import { CreatePageDto } from './dtos/create-page.dto';
import { UpdatePageDto } from './dtos/update-page.dto';
import { Page } from './entities/page.entity';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page)
    private readonly pageModel: typeof Page,
  ) {}

  async create(contractId: string, createPageDto: CreatePageDto): Promise<Page> {
    const page = new Page()
    page.username = createPageDto.username;
    page.contractId = contractId;

    return page.save();
  }

  async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
    const page = this.findOne(id);
    const updatedPage = schemaToModel(page, updatePageDto) as Page;

    return updatedPage.save();
  }

  async findAll(): Promise<Page[]> {
    return this.pageModel.findAll();
  }

  findOne(id: string): Promise<Page> {
    const model = this.pageModel.findOne({
      where: {
        id,
      },
    });

    if (!model) {
      throw new ObjectDoesNotExist();
    }

    return model;
  }

  async remove(id: string): Promise<void> {
    const page = await this.findOne(id);
    await page.destroy();
  }
}