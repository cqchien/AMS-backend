import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableCheckin1618914782540 implements MigrationInterface {
    name = 'CreateTableCheckin1618914782540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "checkin" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "student_id" uuid NOT NULL,
            "class_id" uuid NOT NULL,
            "created_at" timestamp NOT NULL DEFAULT now(),
            "updated_at" timestamp NOT NULL DEFAULT now(),
            "deleted_at" timestamp NOT NULL
          );`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "checkin";`);
    }

}
