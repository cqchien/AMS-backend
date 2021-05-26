import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableClassAddFieldExpireIn1622020160693 implements MigrationInterface {
    name = 'AlterTableClassAddFieldExpireIn1622020160693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class"
        ADD "expire_in" numeric NULL;
        COMMENT ON TABLE "class" IS '';`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``);
    }

}
