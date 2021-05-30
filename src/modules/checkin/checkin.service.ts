import { ClassService } from './../class/class.service';
import { StudentService } from './../student/student.service';
import { CheckinPayloadDto } from './dto/checkinPayload';
import { CheckinRepository } from './checkin.repository';
import { Injectable } from '@nestjs/common';
import { CheckinDto } from './dto/checkinDto';

@Injectable()
export class CheckinService {
    constructor(public checkinRepository: CheckinRepository,
        public studentService: StudentService,
        public classService: ClassService,
        ) {}
    /**
     *
     * @param classId
     * @param studentId
     */
    async getCheckinTimesStudents(
        classId: string,
        studentId: string,
        isFinish: boolean,
    ): Promise<any> {
        const queryBuilder = this.checkinRepository.createQueryBuilder(
            'checkin',
        );
        queryBuilder.andWhere('checkin.class_id = :classId', { classId });
        if (isFinish) {
            queryBuilder
                .leftJoinAndSelect('checkin.class', 'class')
                .andWhere('class.isFinish = :isFinish', { isFinish });
        }
        const timesClassActive = await queryBuilder.getCount();

        queryBuilder.andWhere('checkin.student_id = :studentId', { studentId });
        const timesCheckin = await queryBuilder.getCount();
        return `${timesCheckin}/${timesClassActive}`;
    }

    async checkin(createCheckinDto: CheckinPayloadDto): Promise<CheckinDto> {
        const {classId, studentId} = createCheckinDto;
        const classDto = await this.classService.getOneClass(classId);
        const studentDto = await this.studentService.findOne(studentId);
        
    }
}
