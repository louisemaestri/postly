
import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

export interface PlanMetaContent {
  marks: Array<string>;
  description: string;
}

@Table({ modelName: "plans" })
export class Plan extends Model<Plan> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: UUIDV4
  })
  id: string

  @Column
  name: string;

  @Column
  price: number;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ type: DataType.JSON })
  metaContent: PlanMetaContent;
}