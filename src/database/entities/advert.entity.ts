import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { ModelEntity } from './model.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ADVERTS)
export class AdvertEntity extends CreateUpdateModel {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column()
  model_id: string;
  @ManyToOne(() => ModelEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'model_id' })
  model?: UserEntity;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
