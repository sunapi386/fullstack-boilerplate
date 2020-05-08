import { MigrationInterface, QueryRunner } from "typeorm"

export class Address1588917131080 implements MigrationInterface {
  name = "Address1588917131080"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "unit" character varying, 
        "street" character varying NOT NULL, 
        "city" character varying NOT NULL, 
        "country" character varying NOT NULL, 
        "zipcode" character varying NOT NULL, 
        "lat" double precision, 
        "lng" double precision, 
        CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "addressId" uuid`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "UQ_483cba76a7945db3ed1f4f392dc" UNIQUE ("addressId")`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "addressId" uuid`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_217ba147c5de6c107f2fa7fa271" UNIQUE ("addressId")`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_483cba76a7945db3ed1f4f392dc" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_483cba76a7945db3ed1f4f392dc"`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_217ba147c5de6c107f2fa7fa271"`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "addressId"`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "UQ_483cba76a7945db3ed1f4f392dc"`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "addressId"`,
      undefined,
    )
    await queryRunner.query(`DROP TABLE "address"`, undefined)
  }
}
