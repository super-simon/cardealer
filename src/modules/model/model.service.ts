import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BrandRepository } from '../repository/services/brand.repository';
import { ModelRepository } from '../repository/services/model.repository';
import { CreateModelReqDto } from './dto/req/create-model.dto';
import { UpdateModelReqDto } from './dto/req/update-model.dto';
import { BaseModelResDto } from './dto/res/base-model.res.dto';
import { ModelResDto } from './dto/res/model.res.dto';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelRepository: ModelRepository,
    private readonly brandRepository: BrandRepository,
  ) {}

  async create(createModelReqDto: CreateModelReqDto): Promise<BaseModelResDto> {
    const brand = await this.brandRepository.findOneBy({
      id: createModelReqDto.brand_id,
    });
    if (!brand) {
      throw new NotFoundException('Brand does not exist');
    }

    const duplicateModel = await this.modelRepository.findOneBy({
      title: createModelReqDto.title,
      brand_id: createModelReqDto.brand_id,
    });
    if (duplicateModel) {
      throw new ConflictException('This model already exist');
    }

    return await this.modelRepository.save(
      this.modelRepository.create(createModelReqDto),
    );
  }

  async update(
    modelId: string,
    updateModelReqDto: UpdateModelReqDto,
  ): Promise<ModelResDto> {
    const model = await this.modelRepository.findOneBy({ id: modelId });
    if (!model) {
      throw new NotFoundException(`Model with id ${modelId} not found`);
    }
    this.modelRepository.merge(model, updateModelReqDto);
    return await this.modelRepository.save(model);
  }

  findAll() {
    return `This action returns all model`;
  }

  async getOne(id: string) {
    try {
      return await this.modelRepository.getOneByIdOrFail(id);
    } catch {
      throw new NotFoundException('No brand with this id');
    }
  }

  async remove(modelId: string): Promise<void> {
    const model = await this.modelRepository.findOneBy({ id: modelId });
    if (!model) {
      throw new NotFoundException('Model does not exist');
    }
    this.modelRepository.remove(model);
  }
}
