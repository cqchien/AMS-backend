import { TeacherService } from './../teacher/teacher.service';
import { StudentService } from './../student/student.service';
import { RoleType } from './../../common/constants/role-type';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '../../shared/services/config.service';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        public readonly configService: ConfigService,
        public readonly studentService: StudentService,
        public readonly teacherService: TeacherService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }

    async validate({ iat, exp, id, role }) {
        const timeDiff = exp - iat;
        if (timeDiff <= 0) {
            throw new UnauthorizedException();
        }
        const service =
            role === RoleType.STUDENT
                ? this.studentService
                : this.teacherService;
        const user = await service.findOne({ id });

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
