import { AdvertEntity } from 'src/database/entities/advert.entity';
import { ModelMapper } from '../model/model.mapper';
import { UserMapper } from '../users/user.mapper';
import { AdvertListItemResDto } from './dto/res/advert-list-item.res.dto copy';

export class AdvertMapper {
  public static toResponseListDTO(
    entities: AdvertEntity[],
  ): AdvertListItemResDto[] {
    return entities.map(this.toResponseListItemDTO);
  }

  public static toResponseListItemDTO(
    entity: AdvertEntity,
  ): AdvertListItemResDto {
    return {
      id: entity.id,
      description: entity.description,
      status: entity.status,
      price: entity.price,
      currency: entity.currency,
      model: ModelMapper.toResponseDTO(entity.model),
      user: UserMapper.toResponseDTO(entity.user),
    };
  }
}
