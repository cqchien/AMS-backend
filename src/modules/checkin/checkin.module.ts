import { StudentModule } from './../student/student.module';
import { CheckinRepository } from './checkin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([CheckinRepository])],
    exports: [CheckinService],
    controllers: [CheckinController],
    providers: [CheckinService],
})
export class CheckinModule {}
