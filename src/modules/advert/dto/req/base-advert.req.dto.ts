import { Transform, Type } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { TransformHelper } from 'src/common/helpers/transform.helper';

export class BaseAdvertReqDto {
  @IsString()
  @Type(() => String)
  model_id: string;

  @IsString()
  @Length(50, 3000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;
}
