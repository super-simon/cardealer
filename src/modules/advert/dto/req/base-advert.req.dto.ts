import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { TransformHelper } from 'src/common/helpers/transform.helper';
import { CurrencyEnum } from 'src/database/entities/enums/currency.enum';

export class BaseAdvertReqDto {
  @IsString()
  @Type(() => String)
  model_id: string;

  @IsString()
  @Length(5, 300)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @IsNumber()
  price: number;

  @ApiProperty({ example: CurrencyEnum.UAH })
  @IsString()
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;
}
