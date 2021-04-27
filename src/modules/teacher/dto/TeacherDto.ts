import { TeacherEntity } from './../teacher.entity';
import { RoleType } from './../../../common/constants/role-type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from './../../../common/dto/AbstractDto';

export class TeacherDto extends AbstractDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ type: 'enum', enum: RoleType, default: RoleType.TEACHER })
    role: RoleType;

    @ApiPropertyOptional()
    avatarLink: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    teacherCode: string;

    @ApiProperty()
    email: string;

    constructor(teacher: TeacherEntity) {
        super(teacher);
        this.name = teacher.name;
        this.role = teacher.role,
        this.avatarLink = teacher.avatarLink,
        this.email = teacher.email,
        this.teacherCode = teacher.teacherCode
    }
}
