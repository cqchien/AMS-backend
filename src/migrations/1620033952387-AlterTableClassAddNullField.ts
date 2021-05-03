import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableClassAddNullField1620033952387 implements MigrationInterface {
    name = 'AlterTableClassAddNullField1620033952387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class"
        ALTER "teacher_id" TYPE uuid,
        ALTER "teacher_id" DROP DEFAULT,
        ALTER "teacher_id" DROP NOT NULL;
        COMMENT ON COLUMN "class"."teacher_id" IS '';
        COMMENT ON TABLE "class" IS '';`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``);
    
    }

}
