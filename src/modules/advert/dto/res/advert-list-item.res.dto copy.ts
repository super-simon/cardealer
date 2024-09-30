import { PickType } from '@nestjs/swagger';

import { BaseAdvertResDto } from './base-advert.res.dto';

export class AdvertListItemResDto extends PickType(BaseAdvertResDto, [
  'id',
  'description',
  'status',
  'model',
  'price',
  'currency',
  'user',
]) {}
