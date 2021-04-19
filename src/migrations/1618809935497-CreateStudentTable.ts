import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStudentTable1618809935497 implements MigrationInterface {
    name = 'CreateStudentTable1618809935497';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL,
            "school_year" character varying NULL,
            "created_at" timestamp NOT NULL DEFAULT now(),
            "updated_at" timestamp NOT NULL DEFAULT now(),
            "deleted_at" timestamp NOT NULL,
            "student_code" character varying NOT NULL,
            "class" character varying NULL
          );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "student" `);
    }
}
