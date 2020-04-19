import { MigrationInterface, QueryRunner } from "typeorm"

export class Listing1587272352924 implements MigrationInterface {
  name = "Listing1587272352924"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "listing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" character varying, "description" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id"))`,
      undefined,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "listing"`, undefined)
  }
}
