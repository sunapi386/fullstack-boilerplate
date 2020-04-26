# API Readme

Steps to run this project:

1. `yarn`
2. Setup database settings inside `ormconfig.json` file
3. Run `yarn start` command

`
/w/f/p/api (master)> yarn run typeorm migration:create -n LicensePlate -d src/db
`

https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md#installing-cli


# Database
When doing `createdb` you might first need to add yourself as a user:
```
jsun@glassx ~> psql -U postgres
psql: FATAL:  Peer authentication failed for user "postgres"
jsun@glassx ~ [2]> sudo -u postgres psql
could not change directory to "/home/jsun": Permission denied
psql (11.7 (Ubuntu 11.7-0ubuntu0.19.10.1), server 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1))
Type "help" for help.

postgres=# CREATE USER jsun;
ERROR:  role "jsun" already exists
postgres=# \du
                                   List of roles
 Role name |                         Attributes                         | Member of
-----------+------------------------------------------------------------+-----------
 jsun      |                                                            | {}
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

postgres=# ALTER USER jsun SUPERUSER CREATEDB;
ALTER ROLE
postgres=# \du
                                   List of roles
 Role name |                         Attributes                         | Member of
-----------+------------------------------------------------------------+-----------
 jsun      | Superuser, Create DB                                       | {}
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

postgres=#
```
As `createdb fancystackdb` creates the db, verify that it was created
`psql fancystackdb`
Then `\dt`

If there are issues starting up like
```
/home/jsun/.nvm/versions/node/v12.16.1/bin/node /usr/share/yarn/bin/yarn.js run watch
yarn run v1.12.3
$ tsnd --respawn --transpileOnly --no-notify --ignore-watch node_modules src/index.ts
Ignore watch: [ 'node_modules' ]
Using ts-node version 8.6.2, typescript version 3.8.2
Server started at http://localhost:5555 🚀
error: password authentication failed for user "jsun"
  ...
}
```

```
> sudo tail -f /var/log/postgresql/postgresql-10-main.log

2020-03-07 22:52:45.109 PST [11412] jsun@fancystackdb FATAL:  password authentication failed for user "jsun"
2020-03-07 22:52:45.109 PST [11412] jsun@fancystackdb DETAIL:  User "jsun" has no password assigned.
	Connection matched pg_hba.conf line 92: "host    all             all             127.0.0.1/32            md5"

```
Reset the password and try again? No solution yet. Maybe look in `ormconfig.json`. I solved it once but forgot how.
Perhaps add in `ormconfig.json` but this same issue.
```
 +    "username": "jsun",
 +    "password": "",
```
Trying to alter password didn't work.
```
postgres=# ALTER USER postgres with password 'very_secure_password';
ALTER ROLE
postgres=# ALTER USER postgres with password '';
```


# Playground
Available at http://localhost:5555/graphql

Try creating a complaint with a logged in user.

```
mutation {
	createComplaint(
    data: {
    state:"C4A",
    plate_serial:"1431660",
    title:"guy cut11 me off man",
    description:"1asa",
  }) {
    id
    author {
      id
      email
    }
    description
    title
    plate {
      id
      state
      plate_serial
    }
  }
}
```
with header 
```
{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhOWI3NTQ2LTA2ZjAtNGRiNi1iYjZmLTczYzQ3OTQ3YmYyZCIsImlhdCI6MTU4MzQ2NzU4NSwiZXhwIjoxNTg1ODg2Nzg1LCJhdWQiOlsiQGZ1bGxzdGFjay1ib2lsZXJwbGF0ZS9hcHAiLCJAZnVsbHN0YWNrLWJvaWxlcnBsYXRlL3dlYiJdLCJpc3MiOiJAZnVsbHN0YWNrLWJvaWxlcnBsYXRlL2FwaSJ9.UAqdAb9VkoH1yLv56VLEHls8P51mnhi80jG25K0XPLE"}
```
should return 
```
{
  "data": {
    "createComplaint": {
      "id": "86f5322c-60ad-4761-a02d-fd51cebde370",
      "author": {
        "id": "5a9b7546-06f0-4db6-bb6f-73c47947bf2d",
        "email": "sunapi386@gmail.com"
      },
      "description": "1asa",
      "title": "guy cut11 me off man",
      "plate": {
        "id": "d2ccdbd8-4932-4f8f-9627-af17bf0217d8",
        "state": "C4A",
        "plate_serial": "1431660"
      }
    }
  }
}
```
provided that you first got a token via:
```
mutation {
  login(data:{email:"sunapi386@gmail.com", password:"12345678"}) {
    token
  }
}
```

## TypeORM options
See BaseConnectionOptions

-  `cli`:
-  `database`:
-  `entities`: Entities to be loaded for this connection. Accepts both entity classes and directories where from entities need to be loaded. Directories support glob patterns.
-  `host`: ?
-  `port`: ? Not defined/used in typeorm's connection options (not in ConnectionOptions/PostgresConnectionOptions/BaseConnectionOptions)

-  `logging`:
-  `migrations`: Migrations table name, in case of different name from "migrations". Accepts single string name.
-  `migrationsDir`:
-  `name`:
-  `synchronize`: Indicates if migrations should be auto run on every application launch. Manually can use CLI and run
 migrations:run command.
-  `type`: