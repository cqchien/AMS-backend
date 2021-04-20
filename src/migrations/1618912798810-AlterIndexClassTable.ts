import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterIndexClassTable1618912798810 implements MigrationInterface {
    name = 'AlterIndexClassTable1618912798810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class"
        ADD CONSTRAINT "class_id" PRIMARY KEY ("id"),
        ADD CONSTRAINT "class_course_code" UNIQUE ("course_code"),
        ADD CONSTRAINT "class_qr_code" UNIQUE ("qr_code"),
        ADD FOREIGN KEY ("teacher_id") REFERENCES "teacher" ("id");
        `);
        

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class"
        DROP CONSTRAINT "class_id",
        DROP CONSTRAINT "class_course_code",
        DROP CONSTRAINT "class_qr_code";`);

    }

}
