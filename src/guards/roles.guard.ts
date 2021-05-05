import { StudentEntity } from './../modules/student/student.entity';
import { TeacherEntity } from './../modules/teacher/teacher.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


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
        const user = <TeacherEntity | StudentEntity>request.user;
        
        return role.includes(user.role);
    }
}
