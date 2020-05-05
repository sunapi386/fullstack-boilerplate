import {MigrationInterface, QueryRunner} from "typeorm";

export class UserListingsRelation1588705532975 implements MigrationInterface {
    name = 'UserListingsRelation1588705532975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fileurl" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" character varying, "description" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_eb8b7d3b8455bd889f481760b48" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" ALTER COLUMN "beds" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" ALTER COLUMN "baths" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" ALTER COLUMN "price" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" ALTER COLUMN "reviews" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" ALTER COLUMN "ratings" DROP DEFAULT`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listing" ALTER COLUMN "ratings" SET DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" ALTER COLUMN "reviews" SET DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" ALTER COLUMN "price" SET DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" ALTER COLUMN "baths" SET DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" ALTER COLUMN "beds" SET DEFAULT 0`, undefined);
        await queryRunner.query(`DROP TABLE "fileurl"`, undefined);
    }

}
