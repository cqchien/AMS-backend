import { TeacherEntity } from './../teacher/teacher.entity';
import { StudentEntity } from './../student/student.entity';
import { AuthUser } from './../../decorators/auth-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UseInterceptors, UseGuards, Patch } from '@nestjs/common';
import { AuthUserInterceptor } from './../../interceptors/auth-user-interceptor.service';
import { PageOptionsDto } from './../../common/dto/PageOptionsDto';
import { PageDto } from './../../common/dto/PageDto';
import { CreateClassDto } from './dto/ClassPayloadDto';
import { ClassDto } from './dto/ClassDto';
import { ClassService } from './class.service';
import {
    Controller,
    Post,
    HttpStatus,
    Body,
    Get,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { RoleType } from '../../common/constants/role-type';

@Controller('class')
@ApiTags('class')
export class ClassController {
    constructor(private classService: ClassService) {}

    @Post()
    @Auth(RoleType.ADMIN)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Admin and Training room can create new class',
        type: ClassDto,
    })
    async createClass(@Body() createClassDto: CreateClassDto): Promise<ClassDto> {
        const classEntity = await this.classService.createClass(createClassDto);
        return classEntity.toDto();
    }

    @Get()
    @UseGuards(AuthGuard())
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get all class',
        type: PageDto,
    })
    getClasses(@AuthUser() user: StudentEntity | TeacherEntity, 
        @Query(new ValidationPipe({ transform: true }))
        pageOptionDto: PageOptionsDto, @Query('isFinish') isFinish: boolean,
    ): Promise<PageDto<ClassDto>> {
        return this.classService.getClasses(user, pageOptionDto, isFinish);
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get detail one class',
        type: ClassDto,
    })
    async getOneClass(@UUIDParam('id') classId: string): Promise<ClassDto> {
        const classEntity = await this.classService.getOneClass(classId);
        return classEntity.toDto();
    }

    @Patch('/:id/qrcode')
    @Auth(RoleType.ADMIN, RoleType.TEACHER)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Generate Qr code',
    })
    createQrcode(@UUIDParam('id') classId: string): Promise<any> {
        return this.classService.createQrCode(classId);
    }
}
