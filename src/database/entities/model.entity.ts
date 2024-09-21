import { Column, Entity, OneToMany } from 'typeorm';
import { AdvertEntity } from './advert.entity';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.MODELS)
export class ModelEntity {
  @Column('text')
  title: string;

  @OneToMany(() => AdvertEntity, (entity) => entity.model)
  articles?: AdvertEntity[];
}
