import { PickType } from '@nestjs/swagger';
import { BaseAdvertReqDto } from './base-advert.req.dto';

export class UpdateMyAdvertReqDto extends PickType(BaseAdvertReqDto, [
  'model_id',
  'description',
  'price',
  'currency',
]) {}
