import { PageOptionsDto } from './../../common/dto/PageOptionsDto';
import { PageDto } from './../../common/dto/PageDto';
import { CreateClassDto } from './dto/createClassDto';
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
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Auth } from '../../decorators/http.decorators';
import { RoleType } from '../../common/constants/role-type';

@Controller('class')
@ApiTags('class')
export class ClassController {
    constructor(private classService: ClassService) {}

    @Post()
    @Auth(RoleType.ADMIN, RoleType.TRAININGROOM)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Admin and Training room can create new class',
        type: ClassDto,
    })
    createClass(@Body() createClassDto: CreateClassDto): Promise<ClassDto> {
        return this.classService.createClass(createClassDto);
    }

    @Get()
    @Auth(RoleType.ADMIN, RoleType.TRAININGROOM)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get all class',
        type: PageDto,
    })
    getClasses(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionDto: PageOptionsDto,
    ): Promise<PageDto<ClassDto>> {
        return this.classService.getClasses(pageOptionDto);
    }
}