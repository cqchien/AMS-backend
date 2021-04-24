'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
    @ApiProperty({ type: TokenPayloadDto })
    token: TokenPayloadDto;

    constructor(token: TokenPayloadDto) {
        this.token = token;
    }
}
