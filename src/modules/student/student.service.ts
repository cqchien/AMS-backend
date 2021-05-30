import { UserNotFoundException } from './../../exceptions/user-not-found.exception';
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
    async getOneStudent(studentId: string): Promise<StudentEntity> {
        const studentEntity = await this.studentRepository.findOne({
            id: studentId,
        });
        if (!studentEntity) {
            throw new UserNotFoundException('Student is not found');
        }
        return studentEntity;
    }
}
