import { StudentService } from './../student/student.service';
import { ClassService } from './../class/class.service';
import { CheckinRepository } from './checkin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([CheckinRepository])],
    exports: [CheckinService],
    controllers: [CheckinController],
    providers: [CheckinService, ClassService, StudentService],
})
export class CheckinModule {}
