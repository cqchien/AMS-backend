import { RoleType } from './../../../common/constants/role-type';
'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
    @ApiProperty()
    role: RoleType;

    @ApiProperty({ type: TokenPayloadDto })
    token: TokenPayloadDto;

    constructor(token: TokenPayloadDto, role: RoleType) {
        this.role = role;
        this.token = token;
    }
}
