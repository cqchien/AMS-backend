import { StudentEntity } from './../student/student.entity';
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
import { RoleType } from '../../common/constants/role-type';

@Injectable()
export class ClassService {
    constructor(
        public readonly classRepository: ClassRepository,
        public teacherService: TeacherService,
    ) {}

    /**
     * Get All Classes with query by courseCode or room
     * @param pageOptionDto
     * @returns PageDto
     */
    async getAllClasses(
        pageOptionDto: PageOptionsDto,
    ): Promise<PageDto<ClassDto>> {
        let queryBuilder = this.classRepository.createQueryBuilder('class');
        if (pageOptionDto.q) {
            queryBuilder = queryBuilder.searchByString(pageOptionDto.q, [
                'course_code',
                'room',
            ]);
        }
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
    async getClassesByTeacher(pageOptionDto: PageOptionsDto, teacherId: string): Promise<PageDto<ClassDto>> {
        const queryBuilder = this.classRepository.createQueryBuilder('class');
        const classesByTeacher = queryBuilder.where('class.teacher_id = :teacherId', {teacherId});
        const { items, pageMetaDto } = await classesByTeacher.paginate(
            pageOptionDto,
        );

        return items.toPageDto(pageMetaDto);
    }
 

    async getClassesByStudent(PageOptionsDto: PageOptionsDto, studentId: string){
        const queryBuilder = this.classRepository.createQueryBuilder('class');
        const classesByStudent = queryBuilder.leftJoinAndSelect('class.id', 'checkin')
    }

    /**
     * 
     * @param user 
     * @param pageOptionDto 
     * @returns All Class depends on user role type.
     */
    async getClasses(user : StudentEntity | TeacherEntity,
        pageOptionDto: PageOptionsDto,
    ): Promise<PageDto<ClassDto>> {
        const {role} = user;
        if(role === RoleType.TEACHER){
            return this.getClassesByTeacher(pageOptionDto, user.id)
        }else if(role == RoleType.STUDENT){

        }else {
            return this.getAllClasses(pageOptionDto);
        }
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

        // Check class whether exist or not.
        const classExisted = await this.classRepository.findOne({ courseCode });
        if (classExisted) {
            throw new RecordConflictException('Class is existed in database');
        }
        
        // If user send teacherId, check teacher is exist or not
        let teacher: TeacherEntity;
        if (teacherId) {
            teacher = await this.teacherService.findOne({
                id: teacherId,
            });
        }
        if (!teacher) {
            throw new UserNotFoundException();
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
        return new ClassDto(classEntity, teacher.toDto());
    }
}
