import { AccountTypeEnum } from 'src/database/entities/enums/account-type.enum';
import { RoleEnum } from 'src/database/entities/enums/role.enum';

export class BaseUserResDto {
  id: string;

  name: string;

  email: string;

  bio?: string;

  image?: string;

  role: RoleEnum;

  type: AccountTypeEnum;

  createdAt: Date;

  updatedAt: Date;

  isFollowed: boolean;
}
