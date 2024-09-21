import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { AdvertEntity } from './advert.entity';
import { BrandEntity } from './brand.entity';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.MODELS)
@Unique('unique_model', ['title', 'brand_id'])
export class ModelEntity {
  @PrimaryColumn('text', { name: 'title' })
  title: string;

  @PrimaryColumn('text', { name: 'brand_id' })
  brand_id: string;
  @ManyToOne(() => BrandEntity, (entity) => entity.models)
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  @OneToMany(() => AdvertEntity, (entity) => entity.model)
  articles?: AdvertEntity[];
}
