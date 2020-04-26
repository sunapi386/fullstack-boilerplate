import { getConnectionOptions, createConnection } from "typeorm"
import {
  NODE_ENV,
  DATABASE_URL,
  IS_PRODUCTION,
  IS_STAGING,
} from "../lib/config"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

export const createDbConnection = async () => {
  try {
    // Create DB connection
    console.log(
      `Create DB Connection NODE_ENV=${NODE_ENV} DATABASE_URL=${DATABASE_URL}`,
    )
    const options = (await getConnectionOptions(
      NODE_ENV,
    )) as PostgresConnectionOptions

    const connection = await createConnection({
      ...options,
      // keep this here because typeorm entity assumes this
      // don't change it to 'development' or 'production' etc.
      name: "default", // renames whatever connection name we used in ormconfig.json to default
      // BaseConnectionOptions:
      // * Connection name. If connection name is not given then it will be called "default".
      // * Different connections must have different names.
      // when not 'default'
      // Error interceptor: ConnectionNotFoundError: Connection "default" was not found.
      // when you change it to 'default'
      // Error interceptor: RepositoryNotFoundError: No repository for "User" was found. Looks like this entity is not registered in current "default" connection?
      // despite the db having the relationship table
      url: DATABASE_URL,
    })
    const entity_names = connection.entityMetadatas.map(entity => entity.name)
    console.log("connection.entities", entity_names)
    console.log("connection.migrations", connection.migrations)
    console.log("Migrations..., cwd is ", __dirname)

    // Run migrations in production
    // don't migrate databases automatically, race condition when 1+ servers
    // https://blog.staffjoy.com/dont-migrate-databases-automatically-5039ab061365
    if (IS_PRODUCTION || IS_STAGING) {
      await connection.runMigrations()
      console.log("migrations done.")
    }
  } catch (err) {
    // Sentry
    console.log(err)
    process.exit(0)
  }
}
