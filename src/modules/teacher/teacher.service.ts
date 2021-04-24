import { FindConditions } from 'typeorm';
import { TeacherRepository } from './teacher.repository';
import { Injectable } from '@nestjs/common';
import { TeacherEntity } from './teacher.entity';

@Injectable()
export class TeacherService {
    constructor(public readonly teacherRepository: TeacherRepository) {}

    /**
     * Find single user
     */
    findOne(findData: FindConditions<TeacherEntity>): Promise<TeacherEntity> {
        return this.teacherRepository.findOne(findData);
    }
}
