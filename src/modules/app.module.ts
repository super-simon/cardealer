import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from 'src/common/http/global-exception.filter';
import configuration from '../config/configuration';
import { AdvertModule } from './advert/advert.module';
import { PostsModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { FileStorageModule } from './file-storage/file-storage.module';
import { LoggerModule } from './logger/logger.module';
import { ModelModule } from './model/model.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { TagModule } from './tag/tag.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PostgresModule,
    AuthModule,
    UsersModule,
    PostsModule,
    LoggerModule,
    RepositoryModule,
    RedisModule,
    TagModule,
    FileStorageModule,
    BrandModule,
    ModelModule,
    AdvertModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
