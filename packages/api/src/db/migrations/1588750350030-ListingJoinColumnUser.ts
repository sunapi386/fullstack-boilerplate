import {MigrationInterface, QueryRunner} from "typeorm";

export class ListingJoinColumnUser1588750350030 implements MigrationInterface {
    name = 'ListingJoinColumnUser1588750350030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "authorId"`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" ADD "authorId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" ADD CONSTRAINT "FK_2a5728bfdb94072a282ea672af2" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listing" DROP CONSTRAINT "FK_2a5728bfdb94072a282ea672af2"`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "authorId"`, undefined);
        await queryRunner.query(`ALTER TABLE "listing" ADD "authorId" character varying`, undefined);
    }

}
