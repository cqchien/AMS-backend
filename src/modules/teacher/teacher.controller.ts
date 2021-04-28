import { CreateTeacherDto } from './dto/createTeacherDto';
import { TeacherDto } from './dto/TeacherDto';
import { TeacherService } from './teacher.service';
import { Controller, Post, HttpStatus, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../decorators/http.decorators';
import { RoleType } from '../../common/constants/role-type';

@Controller('teacher')
@ApiTags('teacher')
export class TeacherController {
    constructor(private teacherService: TeacherService){};

    @Post()
    @Auth(RoleType.ADMIN)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Admin create new teacher',
        type: TeacherDto,
    })
    createTeacher(@Body() createTeacherDto: CreateTeacherDto): Promise<TeacherDto> {
        return this.teacherService.createTeacher(createTeacherDto);
    }
}
