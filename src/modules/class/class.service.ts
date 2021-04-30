import { ClassRepository } from './class.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassService {
    constructor(public readonly classRepository: ClassRepository) {}
}
