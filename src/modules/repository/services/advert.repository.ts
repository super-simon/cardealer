import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdvertEntity } from 'src/database/entities/advert.entity';
import { AdvertStatusEnum } from 'src/database/entities/enums/advert-status.enum';

@Injectable()
export class AdvertRepository extends Repository<AdvertEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdvertEntity, dataSource.manager);
  }

  public async getCountByUser(userId: string): Promise<number> {
    const qb = this.createQueryBuilder('advert');
    qb.andWhere('advert.user_id = :userId', { userId });
    qb.andWhere('advert.status != :deletedStatus', {
      deletedStatus: AdvertStatusEnum.DELETED,
    });

    return await qb.getCount();
  }
}
