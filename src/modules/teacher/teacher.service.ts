import { RecordConflictException } from './../../exceptions/record-conflict.exception';
import { CreateTeacherDto } from './dto/createTeacherDto';
import { UtilsService } from './../../providers/utils.service';
import { TeacherDto } from './dto/TeacherDto';
import { FindConditions } from 'typeorm';
import { TeacherRepository } from './teacher.repository';
import { Injectable } from '@nestjs/common';
import { TeacherEntity } from './teacher.entity';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class TeacherService {
    constructor(
        public readonly teacherRepository: TeacherRepository,
        private mailerService: MailService,
    ) {}

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
            throw new RecordConflictException('Teacher is existed in database');
        }
        const password = UtilsService.generatePassword();
        const hashPassword = UtilsService.generateHash(password);
        const teacherEntity = await this.teacherRepository.create({
            password: hashPassword,
            ...createTeacherDto,
        });
        await this.mailerService.sendUserConfirmation(teacherEntity, password);
        await this.teacherRepository.save(teacherEntity);
        return teacherEntity.toDto();
    }
}
