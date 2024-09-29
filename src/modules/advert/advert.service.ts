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
import { CreateAdvertReqDto } from './dto/req/create-advert.req.dto';

@Injectable()
export class AdvertService {
  constructor(
    private readonly advertRepository: AdvertRepository,
    private readonly modelRepository: ModelRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createMy(
    userData: IUserData,
    createAdvertReqDto: CreateAdvertReqDto,
  ): Promise<AdvertEntity> {
    await this.canCreateOrThrow(userData.userId);

    const model = await this.modelRepository.findOneBy({
      id: createAdvertReqDto.model_id,
    });
    if (!model) {
      throw new NotFoundException('Model does not exist');
    }

    const statusFields = {};
    if (!CensorHelper.isEligible(createAdvertReqDto.description)) {
      statusFields['revision'] = 1;
    } else {
      statusFields['status'] = AdvertStatusEnum.ACTIVE;
    }

    return await this.advertRepository.save(
      this.advertRepository.create({
        ...createAdvertReqDto,
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

  public async findOrThrow(
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

  async remove(userData: IUserData, advertId: string): Promise<void> {
    const advert = await this.findOrThrow(userData.userId, advertId);
    this.advertRepository.remove(advert);
  }
}
