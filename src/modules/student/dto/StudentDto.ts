import { StudentEntity } from './../student.entity';
import { RoleType } from '../../../common/constants/role-type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/AbstractDto';

export class StudentDto extends AbstractDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ type: 'enum', enum: RoleType, default: RoleType.STUDENT })
    role: RoleType;

    @ApiPropertyOptional({ nullable: true })
    schoolYear: string;

    @ApiPropertyOptional({ nullable: true })
    mainClass: string;

    @ApiProperty()
    studentCode: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    constructor(student: StudentEntity) {
        super(student);
        this.name = student.name;
        this.role = student.role;
        this.schoolYear = student.schoolYear;
        this.email = student.email;
        this.mainClass = student.class;
        this.studentCode = student.studentCode;
    }
}
