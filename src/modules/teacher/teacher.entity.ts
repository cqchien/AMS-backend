import { ClassEntity } from './../class/class.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from './../../common/constants/role-type';
import { Column, Entity, OneToMany } from 'typeorm';
import { TeacherDto } from './dto/TeacherDto';

@Entity({ name: 'teacher' })
export class TeacherEntity extends AbstractEntity<TeacherDto> {
    @Column()
    name: string;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.TEACHER })
    role: RoleType;

    @Column({ nullable: true, name: 'avatar_link' })
    avatarLink: string;

    @Column()
    password: string;

    @Column({ name: 'teacher_code', unique: true })
    teacherCode: string;

    @Column()
    email: string;

    @OneToMany(()=> ClassEntity, cla => cla.teacher)
    classes: ClassEntity[];

    dtoClass = TeacherDto;
}
