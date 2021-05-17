import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableClassAddFieldIsFinish1621269360366 implements MigrationInterface {
    name = 'AlterTableClassAddFieldIsFinish1621269360366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class"
        ADD "isFinish" boolean NOT NULL DEFAULT false;
        COMMENT ON TABLE "class" IS '';`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``);
        
    }

}
