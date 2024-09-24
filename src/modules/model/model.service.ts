import { Injectable } from '@nestjs/common';
import { CreateModelReqDto } from './dto/req/create-model.dto';
import { UpdateModelReqDto } from './dto/req/update-model.dto';

@Injectable()
export class ModelService {
  create(createModelReqDto: CreateModelReqDto) {
    return 'This action adds a new model';
  }

  findAll() {
    return `This action returns all model`;
  }

  findOne(id: number) {
    return `This action returns a #${id} model`;
  }

  update(id: number, updateModelReqDto: UpdateModelReqDto) {
    return `This action updates a #${id} model`;
  }

  remove(id: number) {
    return `This action removes a #${id} model`;
  }
}
