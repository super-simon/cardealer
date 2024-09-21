import { Column, Entity } from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.BRANDS)
export class BrandEntity {
  @Column('text')
  title: string;
}
