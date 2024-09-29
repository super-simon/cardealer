import { PickType } from '@nestjs/swagger';

import { BaseAdvertResDto } from './base-advert.res.dto';

export class AdvertMyListItemResDto extends PickType(BaseAdvertResDto, [
  'id',
  'description',
  'status',
  'model',
  'price',
  'currency',
]) {}
