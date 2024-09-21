import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { PostgresModule } from '../postgres/postgres.module';
import { SeedingModule } from '../seeding/seeding.module';
import { SeedCommand } from './seed.command';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PostgresModule,
    SeedingModule,
  ],
  providers: [SeedCommand],
})
export class CmdModule {}
