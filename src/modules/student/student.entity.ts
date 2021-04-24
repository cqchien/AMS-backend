import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { Column, Entity } from 'typeorm';
import { StudentDto } from './dto/StudentDto';

@Entity({ name: 'student' })
export class StudentEntity extends AbstractEntity<StudentDto> {
    @Column()
    name: string;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.STUDENT })
    role: RoleType;

    @Column({ nullable: true, name: 'school_year' })
    schoolYear: string;

    @Column()
    password: string;

    @Column({ name: 'student_code', unique: true })
    studentCode: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    class: string;

    dtoClass = StudentDto;
}
