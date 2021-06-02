('use strict');

import { IsDate, IsString } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CheckinPayloadDto {
    @IsString()
    @ApiProperty()
    classId: string;

    @IsString()
    @ApiPropertyOptional()
    studentId: string;

    @IsString()
    @ApiPropertyOptional()
    qrcode: string;
}
