import { PickType } from '@nestjs/swagger';
import { BaseBrandReqDto } from './base-brand.req.dto';

export class UpdateBrandReqDto extends PickType(BaseBrandReqDto, ['title']) {}
