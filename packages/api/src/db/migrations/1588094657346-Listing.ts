import { MigrationInterface, QueryRunner } from "typeorm"

export class Listing1588094657346 implements MigrationInterface {
  name = "Listing1588094657346"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "imageUrl" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "imageAlt" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "reviews" integer default 0`,
    )
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "ratings" integer default 0`,
    )
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "beds" integer default 0`,
    )
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "baths" integer default 0`,
    )
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "price" integer NOT NULL default 0`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "imageAlt"`)
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "imageUrl"`)
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "price"`)
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "beds"`)
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "baths"`)
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "ratings"`)
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "reviews"`)
  }
}
