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
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('checkin')
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
    checkin(@Body() createCheckinDto: CheckinPayloadDto): Promise<CheckinDto> {
        return this.checkinService.checkin(createCheckinDto);
    }
}
