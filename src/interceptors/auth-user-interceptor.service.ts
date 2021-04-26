import { TeacherEntity } from './../modules/teacher/teacher.entity';
import { StudentEntity } from './../modules/student/student.entity';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserEntity } from '../modules/user/user.entity';
import { ContextService } from '../providers/context.service';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const user = <StudentEntity | TeacherEntity>request.user;
        ContextService.setAuthUser(user);

        return next.handle();
    }
}
