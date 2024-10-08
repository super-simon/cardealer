import { Global, Module } from '@nestjs/common';

import { AdvertRepository } from './services/advert.repository';
import { ArticleRepository } from './services/article.repository';
import { BrandRepository } from './services/brand.repository';
import { CommentRepository } from './services/comment.repository';
import { FollowRepository } from './services/follow.repository';
import { LikeRepository } from './services/like.repository';
import { ModelRepository } from './services/model.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { TagRepository } from './services/tag.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  ArticleRepository,
  UserRepository,
  CommentRepository,
  LikeRepository,
  TagRepository,
  RefreshTokenRepository,
  FollowRepository,
  BrandRepository,
  ModelRepository,
  AdvertRepository,
];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
