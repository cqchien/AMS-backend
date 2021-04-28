import { UserConflictException } from './../../exceptions/user-conflict.exception';
import { CreateTeacherDto } from './dto/createTeacherDto';
import { UtilsService } from './../../providers/utils.service';
import { TeacherDto } from './dto/TeacherDto';
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
    /**
     * Find Teacher By Email or TeacherCode
     * @param options
     * @returns TeacherEntity | undefined
     */
    async findByEmailOrTeacherCode(
        options: Partial<{ teacherCode: string; email: string }>,
    ): Promise<TeacherEntity | undefined> {
        const queryBuilder = this.teacherRepository.createQueryBuilder(
            'teacher',
        );
        if (options.email) {
            queryBuilder.orWhere('teacher.email = :email', {
                email: options.email,
            });
        }
        if (options.teacherCode) {
            queryBuilder.orWhere('teacher.teacher_code = :teacherCode', {
                teacherCode: options.teacherCode,
            });
        }

        return queryBuilder.getOne();
    }

    /**
     * Create new teacher from admin
     * @param {TeacherDto} createTeacherDto
     * @return TeacherEntity
     */
    async createTeacher(
        createTeacherDto: CreateTeacherDto,
    ): Promise<TeacherDto> {
        const { email, teacherCode } = createTeacherDto;
        const existTeacher = await this.findByEmailOrTeacherCode({
            teacherCode,
            email,
        });
        if (existTeacher) {
            throw new UserConflictException();
        }
        const password = UtilsService.generatePassword();
        const teacherEntity = await this.teacherRepository.create({
            password,
            ...createTeacherDto,
        });
        await this.teacherRepository.save(teacherEntity);
        return teacherEntity.toDto();
    }
}
