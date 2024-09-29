import { PickType } from '@nestjs/swagger';

import { BaseModelResDto } from './base-model.res.dto';

export class ModelResDto extends PickType(BaseModelResDto, ['id', 'title']) {}
