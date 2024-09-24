import { PickType } from '@nestjs/swagger';

import { BaseBrandResDto } from './base-brand.res.dto';

export class BrandResDto extends PickType(BaseBrandResDto, ['id', 'title']) {}
