import { Type } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class BaseModelReqDto {
  @IsString()
  @Type(() => String)
  @Length(1, 100)
  title: string;

  @IsString()
  @Type(() => String)
  brand_id: string;
}
