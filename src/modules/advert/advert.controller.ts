import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdvertService } from './advert.service';

@ApiTags('Adverts')
@Controller('advert')
export class AdvertController {
  constructor(private readonly advertService: AdvertService) {}
}
