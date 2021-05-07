import { StudentEntity } from './../../modules/student/student.entity';
import { TeacherEntity } from './../../modules/teacher/teacher.entity';
import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
} from 'typeorm';

import { UtilsService } from '../../providers/utils.service';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<TeacherEntity | StudentEntity> {
    listenTo() {
        return TeacherEntity;
    }
    beforeInsert(event: InsertEvent<TeacherEntity | StudentEntity>) {
        if (event.entity.password) {
            event.entity.password = UtilsService.generateHash(
                event.entity.password,
            );
        }
    }
    beforeUpdate(event: UpdateEvent<TeacherEntity | StudentEntity>) {
        if (event.entity.password !== event.databaseEntity.password) {
            event.entity.password = UtilsService.generateHash(
                event.entity.password,
            );
        }
    }
}
