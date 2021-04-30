import { ClassEntity } from './../class.entity';
('use strict');

import { TeacherDto } from './../../teacher/dto/TeacherDto';
import { ClassType } from './../../../common/constants/class-type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from './../../../common/dto/AbstractDto';

export class ClassDto extends AbstractDto {
    @ApiProperty()
    courseCode: string;

    @ApiProperty()
    type: ClassType.THEORY;

    @ApiPropertyOptional()
    desc: string;

    @ApiPropertyOptional()
    room: string;

    @ApiPropertyOptional()
    startTime: string;

    @ApiPropertyOptional()
    endTime: string;

    @ApiProperty()
    qrCode: string;

    @ApiProperty()
    teacher: TeacherDto;

    constructor(classDto: ClassEntity) {
        super(classDto);
        this.courseCode = classDto.courseCode;
        this.type = classDto.type;
        this.desc = classDto.desc;
        this.room = classDto.room;
        this.startTime = classDto.startTime;
        this.endTime = classDto.endTime;
        this.qrCode = classDto.qrCode;
        this.teacher = classDto.teacher;
    }
}
