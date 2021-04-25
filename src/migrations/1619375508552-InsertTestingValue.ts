import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertTestingValue1619375508552 implements MigrationInterface {
    name = 'InsertTestingValue1619375508552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "student" ("id", "name", "school_year", "created_at", "updated_at", "deleted_at", "student_code", "class", "email", "role", "password")
        VALUES (uuid_generate_v4(), 'chien', '3', now(), now(), NULL, '18520526', 'CTTT2018', 'student@gmail.com', 'STUDENT', '$2b$10$sxfQY6DSmG46f20JOrVAn.N7e9LIP4iPoBp7HX/zhBZgOy/HRk16K');
        INSERT INTO "teacher" ("id", "created_at", "updated_at", "deleted_at", "name", "role", "avatar_link", "password", "teacher_code", "email")
VALUES (uuid_generate_v4(), now(), now(), NULL, 'chien ngu', 'TEACHER', NULL, '$2b$10$sxfQY6DSmG46f20JOrVAn.N7e9LIP4iPoBp7HX/zhBZgOy/HRk16K', '18520522', 'caochientp1@gmail.com');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('');
    }

}
