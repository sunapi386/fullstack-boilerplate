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