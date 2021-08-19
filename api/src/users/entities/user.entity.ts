
import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { classToPlain, Exclude } from 'class-transformer';
import { UUIDV4 } from 'sequelize';

@Table({ modelName: "users" })
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: UUIDV4
  })
  id: string

  @Column
  fullname: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ defaultValue: false })
  accountVerified: boolean;
}