import { TeacherService } from './teacher.service';
import { TeacherEntity } from './teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([TeacherEntity])],
    controllers: [],
    providers: [TeacherService],
    exports: [TeacherService],
})
export class TeacherModule {}
