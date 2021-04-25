import {MigrationInterface, QueryRunner} from "typeorm";

export class AllowNullForDeletedAt1619375337703 implements MigrationInterface {
    name = 'AllowNullForDeletedAt1619375337703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student"
        ALTER "deleted_at" TYPE timestamp,
        ALTER "deleted_at" DROP DEFAULT,
        ALTER "deleted_at" DROP NOT NULL;
        COMMENT ON COLUMN "student"."deleted_at" IS '';
        COMMENT ON TABLE "student" IS '';
        ALTER TABLE "class"
        ALTER "deleted_at" TYPE timestamp,
        ALTER "deleted_at" DROP DEFAULT,
        ALTER "deleted_at" DROP NOT NULL;
        COMMENT ON COLUMN "class"."deleted_at" IS '';
        COMMENT ON TABLE "class" IS '';
        ALTER TABLE "checkin"
        ALTER "deleted_at" TYPE timestamp,
        ALTER "deleted_at" DROP DEFAULT,
        ALTER "deleted_at" DROP NOT NULL;
        COMMENT ON COLUMN "checkin"."deleted_at" IS '';
        COMMENT ON TABLE "checkin" IS '';

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('');
    }

}
