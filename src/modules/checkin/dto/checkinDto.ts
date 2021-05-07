import { CheckinEntity } from './../checkin.entity';
import { ClassEntity } from './../../class/class.entity';
import { StudentEntity } from './../../student/student.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from './../../../common/dto/AbstractDto';

export class CheckinDto extends AbstractDto {
    @ApiProperty({ type: StudentEntity })
    student: StudentEntity;

    @ApiProperty({ type: ClassEntity })
    courseClass: ClassEntity;

    @ApiProperty()
    time: Date;

    constructor(checkinEntity: CheckinEntity) {
        super(checkinEntity);
        this.student = checkinEntity.student;
        this.courseClass = checkinEntity.class;
        this.time = checkinEntity.createdAt;
    }
}