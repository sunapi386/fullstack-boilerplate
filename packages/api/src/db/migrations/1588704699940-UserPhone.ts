import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPhone1588704699940 implements MigrationInterface {
    name = 'UserPhone1588704699940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneValidated" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "emailValidated" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "emailValidated"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneValidated"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`, undefined);
    }

}
