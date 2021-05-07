import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    exports: [CheckinService],
    controllers: [CheckinController],
    providers: [CheckinService],
})
export class CheckinModule {}
