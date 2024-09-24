import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BrandEntity } from 'src/database/entities/brand.entity';

@Injectable()
export class BrandRepository extends Repository<BrandEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BrandEntity, dataSource.manager);
  }
}
