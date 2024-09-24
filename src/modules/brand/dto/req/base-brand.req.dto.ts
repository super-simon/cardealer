import { Type } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class BaseBrandReqDto {
  @IsString()
  @Type(() => String)
  @Length(1, 100)
  title: string;
}
