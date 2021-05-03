('use strict');

import { IsEnum, IsString } from 'class-validator';

import { ClassType } from './../../../common/constants/class-type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClassDto {
    @IsString()
    @ApiProperty()
    courseCode: string;

    @IsEnum(ClassType)
    @ApiProperty()
    type: ClassType.THEORY;

    @IsString()
    @ApiPropertyOptional()
    desc: string;

    @IsString()
    @ApiPropertyOptional()
    room: string;

    @IsString()
    @ApiPropertyOptional()
    startTime: string;

    @IsString()
    @ApiPropertyOptional()
    endTime: string;

}
