import { CheckinEntity } from './checkin.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CheckinEntity)
export class CheckinRepository extends Repository<CheckinEntity> {}
