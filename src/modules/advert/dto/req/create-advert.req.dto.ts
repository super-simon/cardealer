import { PickType } from '@nestjs/swagger';
import { BaseAdvertReqDto } from './base-advert.req.dto';

export class CreateAdvertReqDto extends PickType(BaseAdvertReqDto, [
  'model_id',
  'description',
  'price',
  'currency',
]) {}
