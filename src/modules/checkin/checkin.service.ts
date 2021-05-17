import { CheckinRepository } from './checkin.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckinService {
    constructor(public checkinRepository: CheckinRepository) {}
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
}
