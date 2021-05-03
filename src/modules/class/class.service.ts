import { DateTimeNotAcceptableException } from './../../exceptions/datetime-not-acceptable.exception';
import { RecordConflictException } from './../../exceptions/record-conflict.exception';
import { ClassDto } from './dto/ClassDto';
import { CreateClassDto } from './dto/createClassDto';
import { ClassRepository } from './class.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassService {
    constructor(public readonly classRepository: ClassRepository) {}

    /**
     * @param createClassDto
     * @returns classDto
     */
    async createClass(createClassDto: CreateClassDto): Promise<ClassDto> {
        const { courseCode, startTime, endTime } = createClassDto;
        const classExisted = await this.classRepository.findOne({ courseCode });
        if (classExisted) {
            throw new RecordConflictException('Class is existed in database');
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
        const classEntity = await this.classRepository.create({
            ...createClassDto,
        });
        await this.classRepository.save(classEntity);
        return classEntity.toDto();
    }
}
