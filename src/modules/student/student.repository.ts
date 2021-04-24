import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { StudentEntity } from './student.entity';
import { Repository } from 'typeorm';

@EntityRepository(StudentEntity)
export class StudentRepository extends Repository<StudentEntity> {}
