import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserEntity } from '../modules/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const role = this._reflector.get<string[]>(
            'role',
            context.getHandler(),
        );

        if (!role) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = <UserEntity>request.user;
        
        return role.includes(user.role);
    }
}
