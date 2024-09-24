import { PickType } from '@nestjs/swagger';
import { BaseAdvertReqDto } from './base-advert.req.dto';

export class CreateAdvertDto extends PickType(BaseAdvertReqDto, [
  'model_id',
  'description',
]) {}
