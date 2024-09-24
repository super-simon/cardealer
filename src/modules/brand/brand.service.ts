import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandRepository } from '../repository/services/brand.repository';
import { CreateBrandReqDto } from './dto/req/create-brand.dto';
import { UpdateBrandReqDto } from './dto/req/update-brand.dto';
import { BrandResDto } from './dto/res/brand.res.dto';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async create(createBrandReqDto: CreateBrandReqDto): Promise<BrandResDto> {
    return await this.brandRepository.save(
      this.brandRepository.create(createBrandReqDto),
    );
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: string) {
    return `This action returns a #${id} brand`;
  }

  findOneByName(id: string) {
    return `This action returns a #${id} brand`;
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

  remove(brandId: string) {
    return `This action removes a #${brandId} brand`;
  }
}
