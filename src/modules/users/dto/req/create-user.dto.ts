import { PickType } from '@nestjs/swagger';
import { BaseUserReqDto } from './base-user.req.dto';

export class CreateUserDto extends PickType(BaseUserReqDto, [
  'email',
  'password',
  'bio',
  'name',
  'role',
]) {}
