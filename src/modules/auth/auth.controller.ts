import { TeacherDto } from './../teacher/dto/TeacherDto';
import { StudentDto } from './../student/dto/StudentDto';
import { UserNotFoundException } from './../../exceptions/user-not-found.exception';
import { TeacherEntity } from './../teacher/teacher.entity';
import { StudentEntity } from './../student/student.entity';
import { AuthUserInterceptor } from './../../interceptors/auth-user-interceptor.service';
import { UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { AuthUser } from '../../decorators/auth-user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        public readonly userService: UserService,
        public readonly authService: AuthService,
    ) {}

    // Teacher can only login with website
    // Student can only login with mobile app
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: TokenPayloadDto,
        description: 'User info with access token',
    })
    async userLogin(
        @Body() userLoginDto: UserLoginDto,
    ): Promise<LoginPayloadDto> {
        const userEntity = await this.authService.validateUser(userLoginDto);

        const token = await this.authService.createToken(userEntity);
        return new LoginPayloadDto(token);
    }

    @Get('me')
    @UseGuards(AuthGuard())
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Get current user' })
    getCurrentStudent(
        @AuthUser() user: StudentEntity | TeacherEntity,
    ): StudentDto | TeacherDto {
        if (!user) {
            throw new UserNotFoundException();
        }
        return user.toDto();
    }
}
