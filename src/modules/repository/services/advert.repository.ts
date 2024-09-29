import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdvertEntity } from 'src/database/entities/advert.entity';
import { AdvertStatusEnum } from 'src/database/entities/enums/advert-status.enum';

@Injectable()
export class AdvertRepository extends Repository<AdvertEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdvertEntity, dataSource.manager);
  }

  public getMyBaseQueryBuilder(userId: string) {
    const qb = this.createQueryBuilder('advert');
    qb.andWhere('advert.user_id = :userId', { userId });
    qb.andWhere('advert.status != :deletedStatus', {
      deletedStatus: AdvertStatusEnum.DELETED,
    });

    return qb;
  }

  public async getCountByUser(userId: string): Promise<number> {
    const qb = this.getMyBaseQueryBuilder(userId);

    return await qb.getCount();
  }

  public async getByUser(userId: string): Promise<AdvertEntity[]> {
    const qb = this.getMyBaseQueryBuilder(userId);
    qb.leftJoinAndSelect('advert.model', 'model');
    qb.leftJoinAndSelect('model.brand', 'brand');

    return await qb.getMany();
  }
}
