import { PickType } from '@nestjs/swagger';
import { BaseModelReqDto } from './base-model.req.dto';

export class UpdateModelReqDto extends PickType(BaseModelReqDto, [
  'title',
  'brand_id',
]) {}
