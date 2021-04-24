import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { TeacherEntity } from './teacher.entity';
import { Repository } from 'typeorm';

@EntityRepository(TeacherEntity)
export class TeacherRepository extends Repository<TeacherEntity> {}
