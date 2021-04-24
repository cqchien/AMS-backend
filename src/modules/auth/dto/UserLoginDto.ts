'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
    @IsString()
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @ApiProperty()
    readonly password: string;

    @IsBoolean()
    @ApiProperty({ default: false })
    readonly isMobileApp: boolean;
}
