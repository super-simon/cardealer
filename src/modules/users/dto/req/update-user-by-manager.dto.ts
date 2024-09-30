import { PickType } from '@nestjs/swagger';
import { BaseUserReqDto } from './base-user.req.dto';

export class UpdateUserByManagerDto extends PickType(BaseUserReqDto, [
  'bio',
  'name',
  'image',
  'type',
]) {}
