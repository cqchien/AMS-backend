import { ClassEntity } from './class.entity';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Repository } from 'typeorm';

@EntityRepository(ClassEntity)
export class ClassRepository extends Repository<ClassEntity> {}
