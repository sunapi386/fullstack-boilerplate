import {MigrationInterface, QueryRunner} from "typeorm";

export class Asset1589182477063 implements MigrationInterface {
    name = 'Asset1589182477063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "asset" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" uuid, "filename" character varying NOT NULL, "contentType" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_4693445e660817cf6ff8759283a" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_4693445e660817cf6ff8759283a"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`, undefined);
        await queryRunner.query(`DROP TABLE "asset"`, undefined);
    }

}
