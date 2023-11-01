import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';

export interface CreditCardAttributes {
  id?: bigint;
  exp_date: string;
  holder: string;
  number: string;
  cvv: string;
}

@Table({
  timestamps: true,
})
export class CreditCard extends Model<CreditCardAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id?: bigint;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  exp_date: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  holder: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  number: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(4),
    allowNull: false,
  })
  cvv: string;
}
