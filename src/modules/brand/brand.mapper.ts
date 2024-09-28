import { BrandEntity } from 'src/database/entities/brand.entity';
import { BrandListItemResDto } from './dto/res/brand-list-item.res.dto';

export class BrandMapper {
  public static toResponseListDTO(
    entities: BrandEntity[],
  ): BrandListItemResDto[] {
    return entities.map(this.toResponseDTO);
  }

  public static toResponseDTO(entity: BrandEntity): BrandListItemResDto {
    return {
      id: entity.id,
      title: entity.title,
      models: entity.models.map((model) => {
        return { title: model.title, id: model.id };
      }),
    };
  }
}
