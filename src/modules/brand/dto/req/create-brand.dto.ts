import { PickType } from '@nestjs/swagger';
import { BaseBrandReqDto } from './base-brand.req.dto';

export class CreateBrandReqDto extends PickType(BaseBrandReqDto, ['title']) {}
