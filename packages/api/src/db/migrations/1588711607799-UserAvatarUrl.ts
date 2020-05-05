import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAvatarUrl1588711607799 implements MigrationInterface {
    name = 'UserAvatarUrl1588711607799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatarUrl" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarUrl"`, undefined);
    }

}
