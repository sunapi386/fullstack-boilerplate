import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateDatabase1587876385373 implements MigrationInterface {
  name = "CreateDatabase1587876385373"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `CREATE TABLE "plate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "plate_serial" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_eebdaf4c97b73058fba01606616" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `CREATE TABLE "complaint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" uuid, "plateId" uuid, "description" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_a9c8dbc2ab4988edcc2ff0a7337" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `CREATE TABLE
    "listing"("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
              "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
              "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
              "authorId" character varying,
              "description" character varying NOT NULL,
              "title" character varying NOT NULL,
              CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY("id"))`,
      undefined,
    )
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" character varying, "description" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "complaint" ADD CONSTRAINT "FK_0722574160f24d00c5dada22994" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "complaint" ADD CONSTRAINT "FK_65c49e19142bc007859ced462e3" FOREIGN KEY ("plateId") REFERENCES "plate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "complaint" DROP CONSTRAINT "FK_65c49e19142bc007859ced462e3"`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "complaint" DROP CONSTRAINT "FK_0722574160f24d00c5dada22994"`,
      undefined,
    )
    await queryRunner.query(`DROP TABLE "reservation"`, undefined)
    await queryRunner.query(`DROP TABLE "listing"`, undefined)
    await queryRunner.query(`DROP TABLE "complaint"`, undefined)
    await queryRunner.query(`DROP TABLE "plate"`, undefined)
    await queryRunner.query(`DROP TABLE "user"`, undefined)
  }
}
