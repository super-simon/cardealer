import { Injectable } from '@nestjs/common';
import { CreateAdvertDto } from './dto/req/create-advert.req.dto';
import { UpdateAdvertDto } from './dto/req/update-advert.reqdto';

@Injectable()
export class AdvertService {
  create(createAdvertDto: CreateAdvertDto) {
    return 'This action adds a new advert';
  }

  findAll() {
    return `This action returns all advert`;
  }

  findOne(id: number) {
    return `This action returns a #${id} advert`;
  }

  update(id: number, updateAdvertDto: UpdateAdvertDto) {
    return `This action updates a #${id} advert`;
  }

  remove(id: number) {
    return `This action removes a #${id} advert`;
  }
}
