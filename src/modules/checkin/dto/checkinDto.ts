import { ClassDto } from './../../class/dto/ClassDto';
import { StudentDto } from './../../student/dto/StudentDto';
import { CheckinEntity } from './../checkin.entity';
import { ClassEntity } from './../../class/class.entity';
import { StudentEntity } from './../../student/student.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from './../../../common/dto/AbstractDto';

export class CheckinDto extends AbstractDto {
    @ApiProperty({ type: () => StudentDto })
    student: StudentDto;

    @ApiProperty({ type: ClassDto })
    courseClass: ClassDto;

    @ApiProperty()
    time: Date;

    constructor(checkinEntity: CheckinEntity) {
        super(checkinEntity);
        this.student = checkinEntity.student ? checkinEntity.student.toDto() : null;
        this.courseClass = checkinEntity.class ? checkinEntity.class.toDto() : null;
        this.time = checkinEntity.createdAt;
    }
}
