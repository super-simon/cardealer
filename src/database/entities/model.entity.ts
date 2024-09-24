import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { AdvertEntity } from './advert.entity';
import { BrandEntity } from './brand.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.MODELS)
@Unique('unique_model', ['title', 'brand_id'])
export class ModelEntity extends CreateUpdateModel {
  @Column('text', { name: 'title' })
  title: string;

  @Column('text', { name: 'brand_id' })
  brand_id: string;
  @ManyToOne(() => BrandEntity, (entity) => entity.models)
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  @OneToMany(() => AdvertEntity, (entity) => entity.model)
  adverts?: AdvertEntity[];
}
