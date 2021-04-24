import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([StudentRepository])],
    controllers: [],
    providers: [StudentService],
    exports: [StudentService],
})

export class StudentModule {}