import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BrandEntity } from 'src/database/entities/brand.entity';
import { RoleEnum } from 'src/database/entities/enums/role.enum';
import { ModelEntity } from 'src/database/entities/model.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import { brandsAndModels } from './data/brand-and-models';

@Injectable()
export class SeedingService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly dataSource: DataSource,
  ) {}

  async createMainAdminIfThereAreNone(): Promise<boolean> {
    return this.entityManager.transaction(async (em) => {
      const userRepository = em.getRepository(UserEntity);
      const adminsCount = await userRepository.count({
        where: { role: RoleEnum.ADMIN },
      });
      if (adminsCount === 0) {
        const password = await bcrypt.hash('ThePassword', 10);
        const admin = userRepository.create({
          name: 'Super Admin',
          email: 'admin@admin.admin',
          password,
          role: RoleEnum.ADMIN,
        });
        await userRepository.save(admin);
        return true;
      }
      return false;
    });
  }

  async createModelsAndBrands(): Promise<void> {
    return this.entityManager.transaction(async (em) => {
      const modelRepository = em.getRepository(ModelEntity);
      const brandRepository = em.getRepository(BrandEntity);
      for (const brand of brandsAndModels) {
        const brandEntity = await brandRepository.save(
          brandRepository.create({ title: brand.brand }),
        );
        console.log('Brand: ', brand.brand);
        for (const model of brand.models) {
          await modelRepository.save(
            modelRepository.create({ title: model, brand: brandEntity }),
          );
          console.log(' Model: ', model);
        }
      }
    });
  }
}
