import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableClass1618911990194 implements MigrationInterface {
    name = 'CreateTableClass1618911990194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "class" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "course_code" integer NOT NULL,
            "type" character varying NOT NULL DEFAULT 'THEORY',
            "desc" text NULL,
            "room" character varying NULL,
            "start_time" timestamp NULL,
            "finish_time" timestamp NULL,
            "qr_code" integer NULL,
            "teacher_id" uuid NOT NULL,
            "created_at" timestamp NOT NULL DEFAULT now(),
            "updated_at" timestamp NOT NULL DEFAULT now(),
            "deleted_at" timestamp NOT NULL
          );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLEs "class"`);
    }

}
