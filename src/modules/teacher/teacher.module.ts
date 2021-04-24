import { TeacherRepository } from './teacher.repository';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([TeacherRepository])],
    controllers: [],
    providers: [TeacherService],
    exports: [TeacherService],
})
export class TeacherModule {}
