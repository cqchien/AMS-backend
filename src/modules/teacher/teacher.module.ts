import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([TeacherRepository])],
    controllers: [TeacherController],
    providers: [TeacherService],
    exports: [TeacherService],
})
export class TeacherModule {}
