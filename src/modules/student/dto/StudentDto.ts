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
    class: string;

    @ApiProperty()
    studentCode: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
