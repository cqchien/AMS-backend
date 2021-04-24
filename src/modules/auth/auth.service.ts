import { StudentEntity } from './../student/student.entity';
import { TeacherEntity } from './../teacher/teacher.entity';
import { StudentService } from './../student/student.service';
import { TeacherService } from './../teacher/teacher.service';
import { ValidatorService } from './../../shared/services/validator.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { UtilsService } from '../../providers/utils.service';
import { ConfigService } from '../../shared/services/config.service';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';

@Injectable()
export class AuthService {
    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly teacherService: TeacherService,
        public readonly studentService: StudentService,
        public readonly validatorService: ValidatorService,
    ) {}

    async createToken(
        user: TeacherEntity | StudentEntity,
    ): Promise<TokenPayloadDto> {
        return new TokenPayloadDto({
            expiresIn: this.configService.getNumber('JWT_EXPIRATION_TIME'),
            accessToken: await this.jwtService.signAsync({
                id: user.id,
                role: user.role,
            }),
        });
    }

    async validateUser(
        userLoginDto: UserLoginDto,
    ): Promise<TeacherEntity | StudentEntity> {
        const { email, password, isMobileApp } = userLoginDto;
        const service =
            this.validatorService.isDesktopAccess() && isMobileApp === false
                ? this.teacherService
                : this.studentService;

        const user = await service.findOne({ email });

        const isPasswordValid = await UtilsService.validateHash(
            password,
            user && user.password,
        );
        if (!user || !isPasswordValid) {
            throw new UserNotFoundException();
        }
        return user;
    }
}
