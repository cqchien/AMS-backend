import { PageOptionsDto } from './../../common/dto/PageOptionsDto';
import { PageDto } from './../../common/dto/PageDto';
import { CheckinPayloadDto } from './dto/checkinPayload';
import { CheckinDto } from './dto/checkinDto';
import { AuthUserInterceptor } from './../../interceptors/auth-user-interceptor.service';
import { AuthGuard } from '@nestjs/passport';
import { CheckinService } from './checkin.service';
import {
    Controller,
    Post,
    UseGuards,
    UseInterceptors,
    HttpStatus,
    Body,
    Get,
    Query,
    ValidationPipe,
    Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UUIDParam } from 'decorators/http.decorators';

@Controller('/checkin')
export class CheckinController {
    constructor(public checkinService: CheckinService) {}

    @Post()
    @UseGuards(AuthGuard())
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Checkin By qrcode',
        type: CheckinDto,
    })
    async checkin(
        @Body() createCheckinDto: CheckinPayloadDto,
    ): Promise<CheckinDto> {
        const checkinEntity = await this.checkinService.checkin(
            createCheckinDto,
        );
        return checkinEntity.toDto();
    }

    // @Get('/:id')
    // @UseGuards(AuthGuard())
    // @UseInterceptors(AuthUserInterceptor)
    // @ApiBearerAuth()
    // @ApiResponse({
    //     status: HttpStatus.OK,
    //     description: 'Show all Students is checked in with specific class',
    // })
    // async getAllCheckinWithClass(@Query(new ValidationPipe({transform: true})) pageOptionDto: PageOptionsDto, @UUIDParam('id') classId: string ): Promise<any>{
    //     return this.checkinService.getAllCheckinWithClass(pageOptionDto, classId);
    // }

}
