import { Column, Entity, OneToMany } from 'typeorm';

import { AdvertEntity } from './advert.entity';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { AccountTypeEnum } from './enums/account-type.enum';
import { RoleEnum } from './enums/role.enum';
import { TableNameEnum } from './enums/table-name.enum';
import { FollowEntity } from './follow.entity';
import { LikeEntity } from './like.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('enum', { enum: RoleEnum, default: RoleEnum.CLIENT })
  role: RoleEnum;

  @Column('enum', { enum: AccountTypeEnum, default: AccountTypeEnum.BASE })
  type: AccountTypeEnum;

  @Column('enum', { enum: AccountTypeEnum, default: AccountTypeEnum.BASE })
  status: AccountTypeEnum;

  @OneToMany(() => LikeEntity, (entity) => entity.user)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.user)
  comments?: CommentEntity[];

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];

  @OneToMany(() => AdvertEntity, (entity) => entity.user)
  adverts?: AdvertEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.followers)
  followers?: FollowEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.followings)
  followings?: FollowEntity[];
}
