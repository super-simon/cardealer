import { ModelEntity } from 'src/database/entities/model.entity';
import { ModelListItemResDto } from './dto/res/model-list-item.res.dto';

export class ModelMapper {
  public static toResponseListDTO(
    entities: ModelEntity[],
  ): ModelListItemResDto[] {
    return entities.map(this.toResponseDTO);
  }

  public static toResponseDTO(entity: ModelEntity): ModelListItemResDto {
    return {
      id: entity.id,
      title: entity.title,
      brand: { id: entity.brand.id, title: entity.brand.title },
    };
  }
}
