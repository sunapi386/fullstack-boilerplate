# Useful References
https://github.com/MichalLytek/type-graphql/blob/master/docs/resolvers.md

for mutations we usually use input types
for queries we usually use some arguments

# DB
Generating a migration is a little broken? I'd like to just run.
```
yarn db:generate <Name>
```
But it errors, looking for default. So I changed the `development` in `ormconfig.json` to `default`.
Running this
```
yarn run ts-node node_modules/typeorm/cli.js migration:generate -c development -n <Name>
```
Creates a file eg `api/src/db/migrations/1587272476828-Listing.ts`.

## Migrations
Once you get into production you'll need to synchronize model changes into the database. Typically it is unsafe to use synchronize: true for schema synchronization on production once you get data in your database. Here is where migrations come to help.

A migration is just a single file with sql queries to update a database schema and apply new changes to an existing database.

https://github.com/typeorm/typeorm/blob/master/docs/migrations.md

## Checking PostgreSQL DB

- `dropdb fancystackdb` if you want to drop db
- `createdb fancystackdb` creates the db
- `psql fancystackdb` gets a shell to db

And some commonly used commands:

-   `\dt` displays tables
-   `select * from users;` shows all the users
