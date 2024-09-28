import { PickType } from '@nestjs/swagger';

import { BaseBrandResDto } from './base-brand.res.dto';

export class BrandListItemResDto extends PickType(BaseBrandResDto, [
  'id',
  'title',
  'models',
]) {}
