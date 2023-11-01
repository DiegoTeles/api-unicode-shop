import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: bigint;
}
