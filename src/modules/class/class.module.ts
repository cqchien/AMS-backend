import { PassportModule } from '@nestjs/passport';
import { TeacherModule } from './../teacher/teacher.module';
import { ClassRepository } from './class.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClassRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TeacherModule,
    ],
    exports: [
        ClassService,
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [ClassService],
    controllers: [ClassController],
})
export class ClassModule {}
