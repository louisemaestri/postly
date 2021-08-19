
import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { User } from 'src/users/entities/user.entity';

@Table({ modelName: "contracts" })
export class Contract extends Model<Contract> {
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

  @Column
  expiresIn: Date;

  @Column
  renewIn: Date;

  @Column({ defaultValue: false })
  autoRenew: boolean;

  @Column({ type: DataType.JSON })
  planContent: any;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  ownerId: string;

  @BelongsTo(() => User)
  owner: User
}