import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeacherTale1618808907734 implements MigrationInterface {
    name = 'CreateTeacherTale1618808907734';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "teacher" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" timestamp NOT NULL DEFAULT now(),
                "updated_at" timestamp NOT NULL DEFAULT now(),
                "deleted_at" timestamp NULL,
                "name" character varying NOT NULL,
                "role" character varying NOT NULL DEFAULT 'TEACHER',
                "avatar_link" text NULL,
                "password" character varying NOT NULL,
                "teacher_code" character varying NOT NULL
              );`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "teacher"
        `);
    }
}
