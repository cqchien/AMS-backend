import { isEmpty } from 'lodash';
import { ClassEntity } from './class.entity';
import { UtilsService } from './../../providers/utils.service';
import { CheckinService } from './../checkin/checkin.service';
import { StudentEntity } from './../student/student.entity';
import { PageDto } from './../../common/dto/PageDto';
import { PageOptionsDto } from './../../common/dto/PageOptionsDto';
import { TeacherEntity } from './../teacher/teacher.entity';
import { UserNotFoundException } from './../../exceptions/user-not-found.exception';
import { TeacherService } from './../teacher/teacher.service';
import { DateTimeNotAcceptableException } from './../../exceptions/datetime-not-acceptable.exception';
import { RecordConflictException } from './../../exceptions/record-conflict.exception';
import { ClassDto } from './dto/ClassDto';
import { CreateClassDto } from './dto/ClassPayloadDto';
import { ClassRepository } from './class.repository';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { RoleType } from '../../common/constants/role-type';
import QRcode from 'qrcode';
import fs from 'fs';
@Injectable()
export class ClassService {
    constructor(
        public readonly classRepository: ClassRepository,
        public teacherService: TeacherService,
        @Inject(forwardRef(() => CheckinService))
        public checkinService: CheckinService,
    ) {}

    /**
     * Get All Classes with query by courseCode or room
     * @param pageOptionDto
     * @returns PageDto
     */
    async getAllClasses(
        pageOptionDto: PageOptionsDto,
        isFinish: boolean,
    ): Promise<PageDto<ClassDto>> {
        let queryBuilder = this.classRepository.createQueryBuilder('class');
        queryBuilder = queryBuilder.leftJoinAndSelect(
            'class.teacher',
            'teacher',
        );
        if (pageOptionDto.q) {
            queryBuilder = queryBuilder.searchByString(pageOptionDto.q, [
                'course_code',
                'room',
            ]);
        }
        queryBuilder.andWhere('class.isFinish = :isFinish', { isFinish });
        const { items, pageMetaDto } = await queryBuilder.paginate(
            pageOptionDto,
        );

        return items.toPageDto(pageMetaDto);
    }

    /**
     *
     * @param pageOptionDto
     * @param teacherId
     * @returns All class what this teacher teach.
     */
    async getClassesByTeacher(
        pageOptionDto: PageOptionsDto,
        teacherId: string,
        isFinish: boolean,
    ): Promise<PageDto<ClassDto>> {
        const queryBuilder = this.classRepository.createQueryBuilder('class');
        const classesByTeacher = queryBuilder
            .leftJoinAndSelect('class.teacher', 'teacher')
            .andWhere('teacher.id = :teacherId', { teacherId });
        queryBuilder.andWhere('class.isFinish = :isFinish', { isFinish });
        const { items, pageMetaDto } = await classesByTeacher.paginate(
            pageOptionDto,
        );

        return items.toPageDto(pageMetaDto);
    }

    /**
     *
     * @param pageOptionDto
     * @param studentId
     * @returns All class what this student learn.
     */
    async getClassesByStudent(
        pageOptionDto: PageOptionsDto,
        studentId: string,
        isFinish: boolean,
    ): Promise<PageDto<ClassDto>> {
        const queryBuilder = this.classRepository.createQueryBuilder('class');
        const classesByStudent = queryBuilder
            .leftJoinAndSelect('class.teacher', 'teacher')
            .leftJoinAndSelect('class.checkin', 'checkin')
            .leftJoinAndSelect('checkin.student', 'student')
            .andWhere('student.id = :studentId', { studentId });

        queryBuilder.andWhere('class.isFinish = :isFinish', { isFinish });
        const { items, pageMetaDto } = await classesByStudent.paginate(
            pageOptionDto,
        );

        return items.toPageDto(pageMetaDto);
    }

    /**
     *
     * @param user
     * @param pageOptionDto
     * @returns All Class depends on user role type.
     */
    async getClasses(
        user: StudentEntity | TeacherEntity,
        pageOptionDto: PageOptionsDto,
        isFinish: boolean,
    ): Promise<PageDto<ClassDto> | any> {
        const { role } = user;
        if (role === RoleType.TEACHER) {
            return this.getClassesByTeacher(pageOptionDto, user.id, isFinish);
        } else if (role == RoleType.STUDENT) {
            const classes = await this.getClassesByStudent(
                pageOptionDto,
                user.id,
                isFinish,
            );
            const data = [];
            for (const classDto of classes.data) {
                const timesCheckin = await this.checkinService.getCheckinTimesStudents(
                    classDto.id,
                    user.id,
                    isFinish,
                );
                data.push({ ...classDto, timesCheckin });
            }
            return { data, ...classes.meta };
        } else {
            return this.getAllClasses(pageOptionDto, isFinish);
        }
    }

    /**
     * @param createClassDto
     * @returns classDto
     */
    async createClass(createClassDto: CreateClassDto): Promise<ClassEntity> {
        const {
            courseCode,
            startTime,
            endTime,
            type,
            desc,
            room,
            teacherId,
        } = createClassDto;

        // Check class whether exist or not.
        const classExisted = await this.classRepository.findOne({ courseCode });
        if (classExisted) {
            throw new RecordConflictException('Class is existed in database');
        }

        // If user send teacherId, check teacher is exist or not
        let teacher: TeacherEntity;
        if (!isEmpty(teacherId)) {
            teacher = await this.teacherService.getOne(teacherId);
            if (!teacher) {
                throw new UserNotFoundException('Teacher not found');
            }
        }

        // Check the time is valid or not (end time is greater than start time)
        if (startTime && endTime) {
            const dateEnd = new Date(endTime);
            const dateStart = new Date(startTime);

            if (dateEnd <= dateStart) {
                throw new DateTimeNotAcceptableException(
                    'End Time should be greater than start time.',
                );
            }
        }

        // Create entity and then we save it to db
        const classEntity = this.classRepository.create({
            courseCode,
            startTime,
            endTime,
            type,
            desc,
            room,
            teacher,
        });
        await this.classRepository.save(classEntity);
        classEntity.teacher = teacher;
        return classEntity;
    }

    async getOne(classId: string): Promise<ClassEntity> {
        const classEntity = await this.classRepository.findOne(
            { id: classId },
            { relations: ['teacher'] },
        );
        if (!classEntity) {
            throw new UserNotFoundException('Class is not exist');
        }
        return classEntity;
    }

    async updateOneClass(
        classId: string,
        updateClassDto: CreateClassDto,
    ): Promise<ClassDto> {
        const classEntity = this.classRepository.create(updateClassDto);
        await this.classRepository.save(classEntity);
        return classEntity.toDto();
    }

    /**
     *
     * @param courseCode
     * @param classId
     * @returns pathQR
     */
    async generateQR(courseCode: string, classId: string): Promise<string> {
        const key = UtilsService.generateRandomString(5) + '_' + courseCode;
        const fileName = classId + '_' + key;
        const path = `src/assets/qrcode/${fileName}.png`;
        await QRcode.toFile(path, key);
        return `qrcode/${fileName}.png`;
    }

    /**
     *
     * @param classId
     * @returns
     */
    async createQrCode(classId: string): Promise<any> {
        let classEntity = await this.getOne(classId);
        if (classEntity.qrCode) {
            const path = `src/assets/${classEntity.qrCode}`;
            try {
                fs.unlinkSync(path);
            } catch (error) {
                throw new UserNotFoundException('File is not found.');
            }
        }
        const pathQR = await this.generateQR(
            classEntity.courseCode,
            classEntity.id,
        );
        const classEntityPayload = {
            ...classEntity,
            qrCode: pathQR,
            QRCreatedAt: new Date(),
        };
        await this.classRepository.save({
            ...classEntityPayload,
        });
        return { pathQR };
    }
}
