import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/database/entities/enums/role.enum';
import { UserRepository } from 'src/modules/repository/services/user.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRepository: UserRepository,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const {
      user: { userId },
    } = context.switchToHttp().getRequest();
    const user = await this.userRepository.findOneBy({ id: userId });
    const userRole = user.role;

    const allowedRoles = this.reflector.getAllAndOverride<RoleEnum[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    return allowedRoles.includes(userRole);
  }
}
