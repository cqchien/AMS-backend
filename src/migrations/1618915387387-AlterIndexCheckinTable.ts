import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterIndexCheckinTable1618915387387 implements MigrationInterface {
    name = 'AlterIndexCheckinTable1618915387387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "checkin"
        ADD CONSTRAINT "checkin_id" PRIMARY KEY ("id"),
        ADD FOREIGN KEY ("class_id") REFERENCES "class" ("id"),
        ADD FOREIGN KEY ("student_id") REFERENCES "student" ("id");`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "checkin"
        DROP CONSTRAINT "checkin_id",
        DROP CONSTRAINT "checkin_student_id_fkey",
        DROP CONSTRAINT "checkin_class_id_fkey";`);
    }

}
