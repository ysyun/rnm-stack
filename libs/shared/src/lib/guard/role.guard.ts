import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const matchRoles = (roles: string[], userRoles: string) => {
  return roles.some(role => role === userRoles);
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest() as any;
    const user = req.user;
    if (!user) {
      throw new ForbiddenException('User does not exist');
    }
    return matchRoles(requiredRoles, user.role);
  }
}
