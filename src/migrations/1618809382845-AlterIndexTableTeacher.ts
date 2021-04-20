import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterIndexTableTeacher1618809382845 implements MigrationInterface {
    name = 'AlterIndexTableTeacher1618809382845';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher"
        ADD CONSTRAINT "teacher_teacher_code" UNIQUE ("teacher_code"),
        ADD CONSTRAINT "teacher_id" PRIMARY KEY ("id");`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher"
        DROP CONSTRAINT "teacher_teacher_code",
        DROP CONSTRAINT "teacher_id";`)
    }
}
