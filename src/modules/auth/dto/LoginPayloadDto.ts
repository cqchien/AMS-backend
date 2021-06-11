import { RoleType } from './../../../common/constants/role-type';
'use strict';

import { TeacherDto } from './../../teacher/dto/TeacherDto';
import { StudentDto } from './../../student/dto/StudentDto';

import { ApiProperty } from '@nestjs/swagger';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
    @ApiProperty({type: StudentDto})
    user: StudentDto | TeacherDto;

    @ApiProperty()
    role: RoleType

    @ApiProperty({ type: TokenPayloadDto })
    token: TokenPayloadDto;

    constructor(token: TokenPayloadDto, user: StudentDto | TeacherDto) {
        this.user = user;
        this.role = user.role;
        this.token = token;
    }
}
