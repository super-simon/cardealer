import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { ModelEntity } from './model.entity';

@Entity(TableNameEnum.BRANDS)
export class BrandEntity {
  @PrimaryColumn('text', { unique: true })
  title: string;

  @OneToMany(() => ModelEntity, (entity) => entity.brand)
  models?: ModelEntity[];
}
