import { PageDto } from './../../common/dto/PageDto';
import { PageOptionsDto } from './../../common/dto/PageOptionsDto';
import { TeacherEntity } from './../teacher/teacher.entity';
import { UserNotFoundException } from './../../exceptions/user-not-found.exception';
import { TeacherService } from './../teacher/teacher.service';
import { DateTimeNotAcceptableException } from './../../exceptions/datetime-not-acceptable.exception';
import { RecordConflictException } from './../../exceptions/record-conflict.exception';
import { ClassDto } from './dto/ClassDto';
import { CreateClassDto } from './dto/createClassDto';
import { ClassRepository } from './class.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassService {
    constructor(
        public readonly classRepository: ClassRepository,
        public teacherService: TeacherService,
    ) {}

    /**
     *
     * @param pageOptionDto
     * @returns PageDto
     */
    async getClasses(
        pageOptionDto: PageOptionsDto,
    ): Promise<PageDto<ClassDto>> {
        const queryBuilder = this.classRepository.createQueryBuilder('class');
        const { items, pageMetaDto } = await queryBuilder.paginate(
            pageOptionDto,
        );

        return items.toPageDto(pageMetaDto);
    }

    /**
     * @param createClassDto
     * @returns classDto
     */
    async createClass(createClassDto: CreateClassDto): Promise<ClassDto> {
        const {
            courseCode,
            startTime,
            endTime,
            type,
            desc,
            room,
            teacherId,
        } = createClassDto;

        const classExisted = await this.classRepository.findOne({ courseCode });
        if (classExisted) {
            throw new RecordConflictException('Class is existed in database');
        }

        let teacher: TeacherEntity;
        if (teacherId) {
            teacher = await this.teacherService.findOne({
                id: teacherId,
            });
        }
        if (!teacher) {
            throw new UserNotFoundException();
        }

        if (startTime && endTime) {
            const dateEnd = new Date(endTime);
            const dateStart = new Date(startTime);

            if (dateEnd <= dateStart) {
                throw new DateTimeNotAcceptableException(
                    'End Time should be greater than start time.',
                );
            }
        }
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
        return new ClassDto(classEntity, teacher.toDto());
    }
}
