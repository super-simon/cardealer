import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ModelEntity } from 'src/database/entities/model.entity';

@Injectable()
export class ModelRepository extends Repository<ModelEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ModelEntity, dataSource.manager);
  }

  public async getOneByIdOrFail(id: string): Promise<ModelEntity> {
    const qb = this.createQueryBuilder('model');
    qb.andWhere(`model.id = :id`, { id });
    qb.leftJoinAndSelect('model.brand', 'brand');

    return await qb.getOneOrFail();
  }
}
