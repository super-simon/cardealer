import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BrandEntity } from 'src/database/entities/brand.entity';
import { BrandRepository } from '../repository/services/brand.repository';
import { ModelRepository } from '../repository/services/model.repository';
import { CreateBrandReqDto } from './dto/req/create-brand.dto';
import { UpdateBrandReqDto } from './dto/req/update-brand.dto';
import { BrandResDto } from './dto/res/brand.res.dto';

@Injectable()
export class BrandService {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly modelRepository: ModelRepository,
  ) {}

  async create(createBrandReqDto: CreateBrandReqDto): Promise<BrandEntity> {
    const brand = await this.brandRepository.findOneBy({
      title: createBrandReqDto.title,
    });
    if (brand) {
      throw new ConflictException('This brand already exist');
    }

    return await this.brandRepository.save(
      this.brandRepository.create(createBrandReqDto),
    );
  }

  async getList() {
    return await this.brandRepository.getList();
  }

  async getOne(id: string) {
    try {
      return await this.brandRepository.getOneByOrFail({ id });
    } catch {
      throw new NotFoundException('No brand with this id');
    }
  }

  async getOneByName(title: string) {
    try {
      return await this.brandRepository.getOneByOrFail({ title });
    } catch {
      throw new NotFoundException('No brand with this Name');
    }
  }

  async update(
    brandId: string,
    updateBrandReqDto: UpdateBrandReqDto,
  ): Promise<BrandResDto> {
    const brand = await this.brandRepository.findOneBy({ id: brandId });
    if (!brand) {
      throw new NotFoundException(`Brand with id ${brandId} not found`);
    }
    this.brandRepository.merge(brand, updateBrandReqDto);
    return await this.brandRepository.save(brand);
  }

  async updateByName(
    brandName: string,
    updateBrandReqDto: UpdateBrandReqDto,
  ): Promise<BrandResDto> {
    const brand = await this.brandRepository.findOneBy({ title: brandName });
    if (!brand) {
      throw new NotFoundException(`Brand with id ${brandName} not found`);
    }
    this.brandRepository.merge(brand, updateBrandReqDto);
    return await this.brandRepository.save(brand);
  }

  async remove(brandId: string): Promise<void> {
    const brand = await this.brandRepository.findOneBy({ id: brandId });
    if (!brand) {
      throw new NotFoundException('Brand does not exist');
    }
    const models = await this.modelRepository.findBy({ brand: brand });
    if (models.length > 0) {
      throw new ConflictException('Brand is used');
    }
    this.brandRepository.remove(brand);
  }
}
