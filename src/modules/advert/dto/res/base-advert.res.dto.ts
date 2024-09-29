import { ApiProperty } from '@nestjs/swagger';
import { AdvertStatusEnum } from 'src/database/entities/enums/advert-status.enum';
import { CurrencyEnum } from 'src/database/entities/enums/currency.enum';
import { ModelResDto } from 'src/modules/model/dto/res/model.res.dto';
import { UserResDto } from 'src/modules/users/dto/res/user.res.dto';

export class BaseAdvertResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Advert ID',
  })
  id: string;

  @ApiProperty({
    example: 'Advert Description',
    description: 'Advert Description',
  })
  description: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'Advert Status',
  })
  status: AdvertStatusEnum;

  @ApiProperty({
    description: 'Advert car model (id, title)',
  })
  model: ModelResDto;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Advert Created Date',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Advert Updated Date',
  })
  updated: Date;

  @ApiProperty({
    example: '500000',
    description: 'Car price',
  })
  price: number;

  @ApiProperty({
    example: 'UAH',
    description: 'Price currency',
  })
  currency: CurrencyEnum;

  user?: UserResDto;
}
