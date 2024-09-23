import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'src/database/entities/enums/role.enum';

export const Roles = (roles: RoleEnum[]) => SetMetadata('roles', roles);
