import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableClassFieldToText1619715268063 implements MigrationInterface {
    name = 'AlterTableClassFieldToText1619715268063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class"
        ALTER "course_code" TYPE character varying,
        ALTER "course_code" DROP DEFAULT,
        ALTER "course_code" SET NOT NULL,
        ALTER "qr_code" TYPE text,
        ALTER "qr_code" DROP DEFAULT,
        ALTER "qr_code" DROP NOT NULL;
        COMMENT ON COLUMN "class"."course_code" IS '';
        COMMENT ON COLUMN "class"."qr_code" IS '';
        COMMENT ON TABLE "class" IS '';`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``);
    }

}
