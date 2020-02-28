# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

`
/w/f/p/api (master)> yarn run typeorm migration:create -n LicensePlate -d src/db
`

https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md#installing-cli


# Database
As `createdb fullstack-boilerplate` creates the db, verify that it was created
`psql fullstack-boilerplate`
Then `\dt`

# Playground
Available at http://localhost:5555/graphql