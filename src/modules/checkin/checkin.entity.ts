import { ClassEntity } from './../class/class.entity';
import { CheckinDto } from './dto/checkinDto';
import { StudentEntity } from './../student/student.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'checkin' })
export class CheckinEntity extends AbstractEntity<CheckinDto> {
    @ManyToOne(
        () => StudentEntity,
        (studentEntity) => studentEntity.checkin,
    )
    @JoinColumn({ name: 'student_id' })
    student: StudentEntity;

    @ManyToOne(() => ClassEntity, (classEntity) => classEntity)
    @JoinColumn({ name: 'class_id' })
    class: ClassEntity;

    @Column({name: 'isCheckin'})
    isCheckin: Boolean;
    
    dtoClass = CheckinDto;
}
