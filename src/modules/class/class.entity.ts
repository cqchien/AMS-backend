import { TeacherEntity } from './../teacher/teacher.entity';
import { ClassType } from './../../common/constants/class-type';
import { ClassDto } from './dto/ClassDto';
import { AbstractEntity } from "common/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: 'class'})
export class ClassEntity extends AbstractEntity<ClassDto> {
    @Column({name: 'course_code', unique: true})
    courseCode: string;

    @Column()
    type: ClassType.THEORY;

    @Column({nullable: true})
    desc: string;

    @Column({nullable: true})
    room: string;

    @Column({nullable: true})
    startTime: string;

    @Column({nullable: true})
    endTime: string;

    @Column()
    qrCode: string;

    @ManyToOne(()=> TeacherEntity, teacher => teacher.classes)
    @JoinColumn({name: 'teacher_id'})
    teacher: TeacherEntity;

    dtoClass = ClassDto;

}