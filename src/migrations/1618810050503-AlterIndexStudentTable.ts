import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterIndexStudentTable1618810050503 implements MigrationInterface {
    name = 'AlterIndexStudentTable1618810050503';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student"
        ADD CONSTRAINT "student_id" PRIMARY KEY ("id"),
        ADD CONSTRAINT "student_student_code" UNIQUE ("student_code");`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student"
        DROP CONSTRAINT "student_id",
        DROP CONSTRAINT "student_student_code";`);
    }
}
