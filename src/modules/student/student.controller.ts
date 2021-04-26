import { AuthUser } from './../../decorators/auth-user.decorator';
import { StudentService } from './student.service';
import { StudentEntity } from './student.entity';
import { StudentDto } from './dto/StudentDto';
import { AuthUserInterceptor } from './../../interceptors/auth-user-interceptor.service';
import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
@ApiTags('student')
export class StudentController {
    constructor(
        private StudentService: StudentService,
    ){}
    

}

