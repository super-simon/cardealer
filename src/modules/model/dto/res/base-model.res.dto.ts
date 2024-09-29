import { ApiProperty } from '@nestjs/swagger';

export class BaseModelResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Model ID',
  })
  id: string;

  @ApiProperty({
    example: 'Focus',
    description: 'Model title',
  })
  title: string;

  brand: { id: string; title: string };
}
