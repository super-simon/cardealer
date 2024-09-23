import { RoleEnum } from 'src/database/entities/enums/role.enum';

export class BaseUserResDto {
  id: string;

  name: string;

  email: string;

  bio?: string;

  image?: string;

  role: RoleEnum;

  createdAt: Date;

  updatedAt: Date;

  isFollowed: boolean;
}
