# Useful References
https://github.com/MichalLytek/type-graphql/blob/master/docs/resolvers.md

for mutations we usually use input types
for queries we usually use some arguments

# DB
Generating a migration is a little broken? I'd like to just run.
```
yarn db:generate <Name>
```
But typeorm errors, looking for `default`, and typeorm expects at least one entry is called `default`. So I changed the
 `development` in
 `ormconfig.json` to `default`.
The above command is the equivalent of running this
```
yarn run ts-node node_modules/typeorm/cli.js migration:generate -c default -n <Name>
```
expect that `default` is from env. If you have an env file it'll use that.

Running this should creates a migration file e.g. `api/src/db/migrations/1587272476828-Listing.ts`.

## Migrations
Once you get into production you'll need to synchronize model changes into the database.
Typically, it is unsafe to use `synchronize: true` for schema synchronization on production once you get data in your database
. Here is where migrations come to help.

A migration is just a single file with sql queries to update a database schema and apply new changes to an existing database.

https://github.com/typeorm/typeorm/blob/master/docs/migrations.md

- When you run migrations the files in migrations/ folder are used.

```bash
jason@jmbp15-ati ~/w/f/p/api (master)> dropdb fancystackdb; createdb fancystackdb                                                                                                                                                                                        11:44:03
jason@jmbp15-ati ~/w/f/p/api (master)> psql fancystackdb                                                                                                                                                                                                                 11:44:08
psql (12.2)
Type "help" for help.

fancystackdb=# \dt
Did not find any relations.
fancystackdb=# \q
jason@jmbp15-ati ~/w/f/p/api (master)> yarn db:run -c development                                                                                                                                                                                                        11:44:11
yarn run v1.15.2
$ yarn typeorm migration:run -c development
$ ts-node node_modules/typeorm/cli.js migration:run -c development
query: SELECT * FROM "information_schema"."tables" WHERE "table_schema" = current_schema() AND "table_name" = 'migrations'
query: CREATE TABLE "migrations" ("id" SERIAL NOT NULL, "timestamp" bigint NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id"))
query: SELECT * FROM "migrations" "migrations" ORDER BY "id" DESC
0 migrations are already loaded in the database.
2 migrations were found in the source code.
2 migrations are new migrations that needs to be executed.
query: START TRANSACTION
query: CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))
query: CREATE TABLE "plate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "plate_serial" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_eebdaf4c97b73058fba01606616" PRIMARY KEY ("id"))
query: CREATE TABLE "complaint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" uuid, "plateId" uuid, "description" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_a9c8dbc2ab4988edcc2ff0a7337" PRIMARY KEY ("id"))
query: CREATE TABLE "listing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" character varying, "description" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id"))
query: CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" character varying, "description" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))
query: ALTER TABLE "complaint" ADD CONSTRAINT "FK_0722574160f24d00c5dada22994" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE "complaint" ADD CONSTRAINT "FK_65c49e19142bc007859ced462e3" FOREIGN KEY ("plateId") REFERENCES "plate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
query: INSERT INTO "migrations"("timestamp", "name") VALUES ($1, $2) -- PARAMETERS: [1587876385373,"CreateDatabase1587876385373"]
Migration CreateDatabase1587876385373 has been executed successfully.
query: ALTER TABLE "listing" ADD "imageUrl" character varying
query: ALTER TABLE "listing" ADD "imageAlt" character varying
query: ALTER TABLE "listing" ADD COLUMN price numeric
query: ALTER TABLE "listing" ALTER COLUMN price TYPE numeric(10,2)
query: ALTER TABLE "listing" ALTER COLUMN price SET DEFAULT 0
query: INSERT INTO "migrations"("timestamp", "name") VALUES ($1, $2) -- PARAMETERS: [1588094657346,"Listing1588094657346"]
Migration Listing1588094657346 has been executed successfully.
query: COMMIT
✨  Done in 6.72s.
jason@jmbp15-ati ~/w/f/p/api (master)> yarn db:run -c development                                                                                                                                                                                                        11:44:21
yarn run v1.15.2
$ yarn typeorm migration:run -c development
$ ts-node node_modules/typeorm/cli.js migration:run -c development
query: SELECT * FROM "information_schema"."tables" WHERE "table_schema" = current_schema() AND "table_name" = 'migrations'
query: SELECT * FROM "migrations" "migrations" ORDER BY "id" DESC
No migrations are pending
✨  Done in 6.49s.
jason@jmbp15-ati ~/w/f/p/api (master)> psql fancystackdb                                                                                                                                                                                                                 11:44:36
psql (12.2)
Type "help" for help.

fancystackdb=# \dt
          List of relations
 Schema |    Name     | Type  | Owner
--------+-------------+-------+-------
 public | complaint   | table | jason
 public | listing     | table | jason
 public | migrations  | table | jason
 public | plate       | table | jason
 public | reservation | table | jason
 public | user        | table | jason
(6 rows)

fancystackdb=# select * from listing;^C
fancystackdb=# \dt^C
fancystackdb=# select * from listing;
 id | createdAt | updatedAt | authorId | description | title | imageUrl | imageAlt | price
----+-----------+-----------+----------+-------------+-------+----------+----------+-------
(0 rows)

fancystackdb=# select * from migrations;
 id |   timestamp   |            name
----+---------------+-----------------------------
  1 | 1587876385373 | CreateDatabase1587876385373
  2 | 1588094657346 | Listing1588094657346
(2 rows)

fancystackdb=# \q
jason@jmbp15-ati ~/w/f/p/api (master)>
```

## Checking PostgreSQL DB

- `dropdb fancystackdb` if you want to drop db
- `createdb fancystackdb` creates the db
- `psql fancystackdb` gets a shell to db

And some commonly used commands:

-   `\dt` displays tables
-   `select * from users;` shows all the users
