import { PassportModule } from '@nestjs/passport';
import { StudentModule } from './../student/student.module';
import { ClassModule } from './../class/class.module';
import { CheckinRepository } from './checkin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';
import { Module, forwardRef } from '@nestjs/common';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([CheckinRepository]),
        forwardRef(() => ClassModule),
        StudentModule,
    ],
    exports: [
        CheckinService,
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [CheckinController],
    providers: [CheckinService],
})
export class CheckinModule {}
