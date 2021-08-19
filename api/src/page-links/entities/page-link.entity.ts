
import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { Page } from 'src/pages/entities/page.entity';

export enum PageLinkContext {
  WEB_VIDEO = 'WEB_VIDEO',
  WEB_PAGE = 'WEB_PAGE',
  YOUTUBE = 'YOUTUBE'
}

@Table({ modelName: "page_links" })
export class PageLink extends Model<PageLink> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: UUIDV4
  })
  id: string

  @Column
  title: string;

  @Column
  position: number;

  @Column
  url: string;

  @Column
  context: PageLinkContext;

  @ForeignKey(() => Page)
  @Column({ type: DataType.UUID, allowNull: false })
  pageId: string;

  @BelongsTo(() => Page)
  page: Page;
}