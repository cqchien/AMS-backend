import { RoleType } from './../../../common/constants/role-type';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateTeacherDto  {
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    @IsEnum(RoleType)
    role: RoleType.TEACHER;
    
    @IsString()
    @ApiProperty()
    teacherCode: string;

    @IsString()
    @ApiProperty()
    avatarLink: string;
}
