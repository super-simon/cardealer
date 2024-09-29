import { PickType } from '@nestjs/swagger';

import { BaseModelResDto } from './base-model.res.dto';

export class ModelListItemResDto extends PickType(BaseModelResDto, [
  'id',
  'title',
  'brand',
]) {}
