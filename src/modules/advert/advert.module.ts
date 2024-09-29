import { Module } from '@nestjs/common';
import { AdvertController } from './advert.controller';
import { AdvertMyController } from './advert.my.controller';
import { AdvertService } from './advert.service';

@Module({
  controllers: [AdvertController, AdvertMyController],
  providers: [AdvertService],
})
export class AdvertModule {}
