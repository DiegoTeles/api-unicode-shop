import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';

export interface ProductsAttributes {
  id?: bigint;
  title: string;
  description: string;
  price: bigint;
}

@Table({
  timestamps: true,
})
export class Products extends Model<ProductsAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id?: bigint;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: bigint;
}
