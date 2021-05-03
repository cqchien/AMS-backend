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

    @ApiProperty({type: TeacherDto})
    teacher: TeacherDto;

    constructor(classEntity: ClassEntity, teacherDto: TeacherDto) {
        super(classEntity);
        this.courseCode = classEntity.courseCode;
        this.type = classEntity.type;
        this.desc = classEntity.desc;
        this.room = classEntity.room;
        this.startTime = classEntity.startTime;
        this.endTime = classEntity.endTime;
        this.qrCode = classEntity.qrCode;
        this.teacher = teacherDto;
    }
}
