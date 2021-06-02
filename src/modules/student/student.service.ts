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
    async getOne(studentId: string): Promise<StudentEntity> {
        const studentEntity = await this.studentRepository.findOne({
            id: studentId,
        });
        if (!studentEntity) {
            throw new UserNotFoundException('Student is not found');
        }
        return studentEntity;
    }

        /**
     * Find Student By Email or StudentCode
     * @param options
     * @returns StudentEntity | undefined
     */
         async findByEmailOrCode(
            options: Partial<{ studentCode: string; email: string }>,
        ): Promise<StudentEntity | undefined> {
            const queryBuilder = this.studentRepository.createQueryBuilder(
                'student',
            );
            if (options.email) {
                queryBuilder.orWhere('student.email = :email', {
                    email: options.email,
                });
            }
            if (options.studentCode) {
                queryBuilder.orWhere('student.student_code = :studentCode', {
                    studentCode: options.studentCode,
                });
            }
    
            return queryBuilder.getOne();
        }
}
