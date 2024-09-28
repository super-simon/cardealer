import { ApiProperty } from '@nestjs/swagger';

export class BaseBrandResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Brand ID',
  })
  id: string;

  @ApiProperty({
    example: 'Ford',
    description: 'Brand title',
  })
  title: string;

  @ApiProperty({
    example: [
      { id: '796cea24-a328-4463-a5e1-85a779e4780f', title: 'Focus' },
      { id: '796cea24-a328-4463-a5e1-85a779e4780f', title: 'Fusion' },
    ],
    description: 'Article Tags',
  })
  models: { id: string; title: string }[];
}
