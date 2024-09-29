import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AdvertStatusEnum } from './enums/advert-status.enum';
import { CurrencyEnum } from './enums/currency.enum';
import { TableNameEnum } from './enums/table-name.enum';
import { ModelEntity } from './model.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ADVERTS)
export class AdvertEntity extends CreateUpdateModel {
  @Column('text')
  description: string;

  @Column('float')
  price: number;

  @Column('enum', { enum: CurrencyEnum, default: CurrencyEnum.UAH })
  currency: CurrencyEnum;

  @Column('enum', { enum: AdvertStatusEnum, default: AdvertStatusEnum.DRAFT })
  status: AdvertStatusEnum;

  @Column('int', { default: 0 })
  revision: number;

  @Column()
  model_id: string;
  @ManyToOne(() => ModelEntity, (entity) => entity.adverts, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'model_id' })
  model?: ModelEntity;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.adverts)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
