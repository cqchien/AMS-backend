import { FindConditions } from 'typeorm';
import { StudentRepository } from './student.repository';
import { Injectable } from '@nestjs/common';
import { StudentEntity } from './student.entity';

@Injectable()
export class StudentService {
    constructor(public readonly studentRepository: StudentRepository) {}

    /**
     * Find single user
     */
    findOne(findData: FindConditions<StudentEntity>): Promise<StudentEntity> {
        return this.studentRepository.findOne(findData);
    }
}
