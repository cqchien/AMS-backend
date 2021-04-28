import { RoleType } from './../../../common/constants/role-type';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateTeacherDto  {
    @IsString()
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @ApiProperty()
    @IsEnum(RoleType)
    readonly role: RoleType.TEACHER;
    
    @IsString()
    @ApiProperty()
    readonly teacherCode: string;

    @IsString()
    @ApiProperty()
    readonly avatarLink: string;
}
