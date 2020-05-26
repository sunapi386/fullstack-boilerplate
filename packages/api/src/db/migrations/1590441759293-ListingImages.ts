import {MigrationInterface, QueryRunner} from "typeorm";

export class ListingImages1590441759293 implements MigrationInterface {
    name = 'ListingImages1590441759293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listing" ADD "imageKeys" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "imageKeys"`);
    }

}
