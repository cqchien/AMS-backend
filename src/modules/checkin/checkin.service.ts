import { UserNotFoundException } from './../../exceptions/user-not-found.exception';
import { CheckinEntity } from './checkin.entity';
import { ClassService } from './../class/class.service';
import { StudentService } from './../student/student.service';
import { CheckinPayloadDto } from './dto/checkinPayload';
import { CheckinRepository } from './checkin.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckinService {
    constructor(
        public readonly checkinRepository: CheckinRepository,
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

    async checkin(createCheckinDto: CheckinPayloadDto): Promise<CheckinEntity> {
        const { classId, studentId, qrcode } = createCheckinDto;
        const pathQR = `qrcode/${classId}_${qrcode}.png`;
        const [classEntity, studentEntity] = await Promise.all([
            this.classService.getOne(classId),
            this.studentService.getOne(studentId),
        ]);
        const date = new Date();
        const QRCreatedDate = new Date(classEntity.QRCreatedAt);
        const constraintDate = date.getTime() - QRCreatedDate.getTime();
        if (classEntity.qrCode !== pathQR || constraintDate > 3600000 * 5) {
            throw new UserNotFoundException('QRCode is invalid');
        }
        const payload = {
            class: classEntity,
            student: studentEntity,
        };

        const checkinEntity = this.checkinRepository.create(payload);
        return this.checkinRepository.save(checkinEntity);
    }
}
