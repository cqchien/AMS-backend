import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldToTableStudentAndTeacher1619247786224
    implements MigrationInterface {
    name = 'AddFieldToTableStudentAndTeacher1619247786224';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher"
        ADD "email" character varying NOT NULL;
        COMMENT ON TABLE "teacher" IS '';
        ALTER TABLE "student"
        ADD "email" character varying NOT NULL;
        COMMENT ON TABLE "student" IS '';`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher"
        DROP "email";
        COMMENT ON TABLE "teacher" IS '';
        ALTER TABLE "student"
        DROP "email";
        COMMENT ON TABLE "student" IS '';`);
    }
}
