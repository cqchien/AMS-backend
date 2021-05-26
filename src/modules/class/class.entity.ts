import { CheckinEntity } from './../checkin/checkin.entity';
import { TeacherEntity } from './../teacher/teacher.entity';
import { ClassType } from './../../common/constants/class-type';
import { ClassDto } from './dto/ClassDto';
import { AbstractEntity } from '../../common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'class' })
export class ClassEntity extends AbstractEntity<ClassDto> {
    @Column({ name: 'course_code', unique: true })
    courseCode: string;

    @Column()
    type: ClassType.THEORY;

    @Column({ nullable: true })
    desc: string;

    @Column({ nullable: true })
    room: string;

    @Column({ nullable: true, name: 'start_time' })
    startTime: string;

    @Column({ nullable: true, name: 'finish_time' })
    endTime: string;

    @Column()
    qrCode: string;

    @Column({name: 'isFinish'})
    isFinish: boolean;

    @Column({name: 'expire_in'})
    expireInQrCode: number;

    @ManyToOne(() => TeacherEntity, (teacher) => teacher.classes)
    @JoinColumn({ name: 'teacher_id' })
    teacher: TeacherEntity;

    @OneToMany(
        () => CheckinEntity,
        (checkinEntity) => checkinEntity.class,
    )
    checkin: CheckinEntity[];
    
    dtoClass = ClassDto;
}
