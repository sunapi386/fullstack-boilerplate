import { MigrationInterface, QueryRunner } from "typeorm"

export class AvatarKey1590293808573 implements MigrationInterface {
  name = "AvatarKey1590293808573"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "avatarUrl" TO "avatarKey"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "avatarKey" TO "avatarUrl"`)
  }
}
