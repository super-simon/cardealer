import { Column, Entity, OneToMany } from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { ModelEntity } from './model.entity';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.BRANDS)
export class BrandEntity extends CreateUpdateModel {
  @Column('text', { unique: true })
  title: string;

  @OneToMany(() => ModelEntity, (entity) => entity.brand)
  models?: ModelEntity[];
}
