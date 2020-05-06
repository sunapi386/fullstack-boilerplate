# Migrations
Note that the generated migrations by typeorm is usually broken and needs to be modified by hand.

Validate the migrations on develop before doing the migration on production


```
fancystackdb=# ALTER TABLE "listing"
        ALTER COLUMN "authorId"
        TYPE character varying;
ALTER TABLE
fancystackdb=# \d listing
                               Table "public.listing"
   Column    |           Type           | Collation | Nullable |      Default
-------------+--------------------------+-----------+----------+--------------------
 id          | uuid                     |           | not null | uuid_generate_v4()
 createdAt   | timestamp with time zone |           | not null | now()
 updatedAt   | timestamp with time zone |           | not null | now()
 description | character varying        |           | not null |
 title       | character varying        |           | not null |
 imageUrl    | character varying        |           |          |
 imageAlt    | character varying        |           |          |
 reviews     | integer                  |           |          |
 ratings     | integer                  |           |          |
 beds        | integer                  |           |          |
 baths       | integer                  |           |          |
 price       | integer                  |           | not null |
 authorId    | character varying        |           |          |
Indexes:
    "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY, btree (id)

fancystackdb=# ALTER TABLE "listing"
        ALTER COLUMN "authorId"
        TYPE uuid USING "authorId"::uuid;
ALTER TABLE
fancystackdb=# \d listing
                               Table "public.listing"
   Column    |           Type           | Collation | Nullable |      Default
-------------+--------------------------+-----------+----------+--------------------
 id          | uuid                     |           | not null | uuid_generate_v4()
 createdAt   | timestamp with time zone |           | not null | now()
 updatedAt   | timestamp with time zone |           | not null | now()
 description | character varying        |           | not null |
 title       | character varying        |           | not null |
 imageUrl    | character varying        |           |          |
 imageAlt    | character varying        |           |          |
 reviews     | integer                  |           |          |
 ratings     | integer                  |           |          |
 beds        | integer                  |           |          |
 baths       | integer                  |           |          |
 price       | integer                  |           | not null |
 authorId    | uuid                     |           |          |
Indexes:
    "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY, btree (id)

fancystackdb=#
```


E.g. TypeORM incorrectly removes the column and re-adds it causing data loss.

This is what it generated
```
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
```

This is what it should be
```
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query( `ALTER TABLE "listing" ALTER COLUMN "authorId" TYPE uuid USING "authorId"::uuid`, undefined, )
    await queryRunner.query( `ALTER TABLE "listing" ADD CONSTRAINT "FK_2a5728bfdb94072a282ea672af2" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined, )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query( `ALTER TABLE "listing" DROP CONSTRAINT "FK_2a5728bfdb94072a282ea672af2"`, undefined, )
    await queryRunner.query( `ALTER TABLE "listing" ALTER COLUMN "authorId" TYPE character varying`, undefined,
    )
  }
```
