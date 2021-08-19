
import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { Contract } from 'src/contracts/entities/contract.entity';

@Table({ modelName: "pages" })
export class Page extends Model<Page> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: UUIDV4
  })
  id: string
  
  @Column
  title: string;

  @Column({
    unique: true,
    validate: {
      isUnique: function (username) {
        Page.findOne({ where: { username: username }})
            .then(function (page) {
              if (page) {
                  throw new Error('Username already in use');
              }
          }
        );
      }
    }
  })
  username: string;

  @Column
  favicon: string;

  @Column({ type: DataType.JSON })
  theme: JSON;

  @Column({ type: DataType.JSON })
  modifiers: JSON;

  @ForeignKey(() => Contract)
  @Column({ type: DataType.UUID, allowNull: false })
  contractId: string;

  @BelongsTo(() => Contract)
  contract: Contract;
}
