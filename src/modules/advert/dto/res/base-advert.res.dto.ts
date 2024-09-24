import { ApiProperty } from '@nestjs/swagger';
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
    description: 'Advert car model id',
  })
  model: string;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Article Created Date',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Article Updated Date',
  })
  updated: Date;

  user?: UserResDto;
}
