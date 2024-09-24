import { PickType } from '@nestjs/swagger';
import { BaseModelReqDto } from './base-model.req.dto';

export class CreateModelReqDto extends PickType(BaseModelReqDto, ['title']) {}
