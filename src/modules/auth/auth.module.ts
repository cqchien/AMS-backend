import { StudentModule } from './../student/student.module';
import { TeacherModule } from './../teacher/teacher.module';
import { ValidatorService } from './../../shared/services/validator.service';
import { StudentService } from './../student/student.service';
import { TeacherService } from './../teacher/teacher.service';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        forwardRef(() => UserModule),
        forwardRef(() => TeacherModule),
        forwardRef(() => StudentModule),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService],
})
export class AuthModule {}
