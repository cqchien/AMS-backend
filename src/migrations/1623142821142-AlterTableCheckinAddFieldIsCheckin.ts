import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCheckinAddFieldIsCheckin1623142821142
    implements MigrationInterface {
    name = 'AlterTableCheckinAddFieldIsCheckin1623142821142';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "checkin"
        ADD "isCheckin" boolean NOT NULL DEFAULT false;
        COMMENT ON TABLE "checkin" IS '';`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``);
    }
}
