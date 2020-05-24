import { MigrationInterface, QueryRunner } from "typeorm"

export class AvatarKey1590293808573 implements MigrationInterface {
  name = "AvatarKey1590293808573"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarUrl"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "avatarKey" character varying`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarKey"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "avatarUrl" character varying`,
    )
  }
}
