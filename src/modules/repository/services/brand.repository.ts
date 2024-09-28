import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BrandEntity } from 'src/database/entities/brand.entity';

@Injectable()
export class BrandRepository extends Repository<BrandEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BrandEntity, dataSource.manager);
  }

  public async getList(): Promise<BrandEntity[]> {
    const qb = this.createQueryBuilder('brand');
    qb.leftJoinAndSelect('brand.models', 'model');
    return await qb.getMany();
  }

  public async getOneByOrFail(options): Promise<BrandEntity> {
    const qb = this.createQueryBuilder('brand');
    for (const option in options) {
      qb.andWhere(`brand.${option} = :${option}`, {
        [option]: options[option],
      });
    }
    qb.leftJoinAndSelect('brand.models', 'model');

    return await qb.getOneOrFail();
  }
}
