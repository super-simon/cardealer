import { AdvertEntity } from 'src/database/entities/advert.entity';
import { ModelMapper } from '../model/model.mapper';
import { AdvertMyListItemResDto } from './dto/res/advert-my-list-item.res.dto';

export class AdvertMapper {
  public static toResponseListDTO(
    entities: AdvertEntity[],
  ): AdvertMyListItemResDto[] {
    return entities.map(this.toResponseListItemDTO);
  }

  public static toResponseListItemDTO(
    entity: AdvertEntity,
  ): AdvertMyListItemResDto {
    return {
      id: entity.id,
      description: entity.description,
      status: entity.status,
      price: entity.price,
      currency: entity.currency,
      model: ModelMapper.toResponseDTO(entity.model),
    };
  }
}
