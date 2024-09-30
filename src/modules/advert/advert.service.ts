import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CensorHelper } from 'src/common/helpers/censor.helper';
import { AdvertEntity } from 'src/database/entities/advert.entity';
import { AccountTypeEnum } from 'src/database/entities/enums/account-type.enum';
import { AdvertStatusEnum } from 'src/database/entities/enums/advert-status.enum';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { AdvertRepository } from '../repository/services/advert.repository';
import { ModelRepository } from '../repository/services/model.repository';
import { UserRepository } from '../repository/services/user.repository';
import { CreateMyAdvertReqDto } from './dto/req/create-my-advert.req.dto';
import { UpdateAdvertReqDto } from './dto/req/update-advert.req.dto';
import { UpdateMyAdvertReqDto } from './dto/req/update-my-advert.req.dto';

@Injectable()
export class AdvertService {
  constructor(
    private readonly advertRepository: AdvertRepository,
    private readonly modelRepository: ModelRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createMy(
    userData: IUserData,
    createMyAdvertReqDto: CreateMyAdvertReqDto,
  ): Promise<AdvertEntity> {
    await this.canCreateOrThrow(userData.userId);

    const model = await this.modelRepository.findOneBy({
      id: createMyAdvertReqDto.model_id,
    });
    if (!model) {
      throw new NotFoundException('Model does not exist');
    }

    const statusFields = {};
    if (!CensorHelper.isEligible(createMyAdvertReqDto.description)) {
      statusFields['revision'] = 1;
    } else {
      statusFields['status'] = AdvertStatusEnum.ACTIVE;
    }

    return await this.advertRepository.save(
      this.advertRepository.create({
        ...createMyAdvertReqDto,
        user_id: userData.userId,
        ...statusFields,
      }),
    );
  }

  public async canCreateOrThrow(userId: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (user.type !== AccountTypeEnum.PREMIUM) {
      const advertsCount = await this.advertRepository.getCountByUser(userId);

      if (advertsCount > 0) {
        throw new ForbiddenException('This user can not create more adverts');
      }
    }
  }

  public async getMyList(userData: IUserData): Promise<AdvertEntity[]> {
    const myAdverts = await this.advertRepository.getListByUser(
      userData.userId,
    );
    return myAdverts;
  }

  public async getList(): Promise<AdvertEntity[]> {
    const myAdverts = await this.advertRepository.getList();
    return myAdverts;
  }

  async updateMy(
    userData: IUserData,
    advertId: string,
    updateMyAdvertReqDto: UpdateMyAdvertReqDto,
  ): Promise<AdvertEntity> {
    const advert = await this.findMyOrThrow(userData.userId, advertId);

    if (advert.revision === 3 && advert.status === AdvertStatusEnum.DRAFT) {
      throw new ForbiddenException(
        'Your article included bad words thre times and now on moderation',
      );
    }

    if (updateMyAdvertReqDto.model_id) {
      const model = await this.modelRepository.findOneBy({
        id: updateMyAdvertReqDto.model_id,
      });
      if (!model) {
        throw new NotFoundException('Model does not exist');
      }
      advert.model = model;
    }

    const statusFields = {};
    if (updateMyAdvertReqDto.description) {
      if (!CensorHelper.isEligible(updateMyAdvertReqDto.description)) {
        statusFields['revision'] = advert.revision + 1;
        statusFields['status'] = AdvertStatusEnum.DRAFT;
      } else {
        statusFields['status'] = AdvertStatusEnum.ACTIVE;
      }
    }

    this.advertRepository.merge(advert, {
      ...updateMyAdvertReqDto,
      ...statusFields,
    });
    return await this.advertRepository.save(advert);
  }

  public async findMyOrThrow(
    userId: string,
    advertId: string,
  ): Promise<AdvertEntity> {
    const advert = await this.advertRepository.findOneBy({
      id: advertId,
      user_id: userId,
    });

    if (!advert) {
      throw new NotFoundException('Advert does not exist');
    }
    return advert;
  }

  async removeMy(userData: IUserData, advertId: string): Promise<void> {
    const advert = await this.findMyOrThrow(userData.userId, advertId);
    this.advertRepository.remove(advert);
  }

  public async findOrThrow(advertId: string): Promise<AdvertEntity> {
    const advert = await this.advertRepository.findOneBy({
      id: advertId,
    });

    if (!advert) {
      throw new NotFoundException('Advert does not exist');
    }
    return advert;
  }

  async update(
    advertId: string,
    updateAdvertReqDto: UpdateAdvertReqDto,
  ): Promise<AdvertEntity> {
    const advert = await this.findOrThrow(advertId);

    if (updateAdvertReqDto.model_id) {
      const model = await this.modelRepository.findOneBy({
        id: updateAdvertReqDto.model_id,
      });
      if (!model) {
        throw new NotFoundException('Model does not exist');
      }
      advert.model = model;
    }

    this.advertRepository.merge(advert, {
      ...updateAdvertReqDto,
    });
    return await this.advertRepository.save(advert);
  }

  async remove(advertId: string): Promise<void> {
    const advert = await this.findOrThrow(advertId);
    this.advertRepository.remove(advert);
  }
}
