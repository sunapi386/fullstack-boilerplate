# FancyStack

## Typescript + React + Graphql

Comes with user authentication included

- [React](https://github.com/facebook/react)
- [TypeGraphQL](https://github.com/19majkel94/type-graphql)
- [TypeORM](https://github.com/typeorm/typeorm)
- Postgres
- Typescript
- Eslint
- Graphql Code Generator
- Apollo Client
- Apollo Server
- Express
- Redis
- Customizable Theme
- Dark mode
- React hooks
- Chakra UI
- React hook form
- Lerna Monorepo

& many more tasty treats

## Get Started

**Must have node, yarn/npm, postgres and redis installed and setup locally**

1. `git clone https://github.com/sunapi386/fullstack-boilerplate.git`
2. `yarn install`
3. `createdb fancystackdb` (must have postgres setup locally)
4. `cd packages/api && yarn watch`
5. `cd packages/web && yarn start`

## Local Running
Make a `.env` file with vars you want to set. E.g.
```
APP_ENV=           development
NODE_ENV=          development
PORT=              5555
```
You can use `heroku local`