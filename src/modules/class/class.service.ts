import { RecordConflictException } from './../../exceptions/record-conflict.exception';
import { ClassDto } from './dto/ClassDto';
import { CreateClassDto } from './dto/createClassDto';
import { ClassRepository } from './class.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassService {
    constructor(public readonly classRepository: ClassRepository) {}

    async createClass(createClassDto: CreateClassDto): Promise<ClassDto> {
        const classExisted = await this.classRepository.findOne(
            {courseCode: createClassDto.courseCode,}
        );
        if (classExisted) {
            throw new RecordConflictException('Class is existed in database');
        }
        const classEntity = await this.classRepository.create({...createClassDto});
        await this.classRepository.save(classEntity);
        return classEntity.toDto();
    }
}
