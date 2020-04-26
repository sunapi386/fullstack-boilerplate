import { getConnectionOptions, createConnection } from "typeorm"
import {
  ORMCONFIG_USE_NAME,
  DATABASE_URL,
  IS_PRODUCTION,
  IS_STAGING,
} from "../lib/config"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

export const createDbConnection = async () => {
  try {
    // Create DB connection
    console.log(
      `Create DB Connection ORMCONFIG_USE_NAME=${ORMCONFIG_USE_NAME} DATABASE_URL=${DATABASE_URL}`,
    )
    const options = (await getConnectionOptions(
      ORMCONFIG_USE_NAME,
    )) as PostgresConnectionOptions

    const connection = await createConnection({
      ...options,
      name: ORMCONFIG_USE_NAME,
      url: DATABASE_URL,
    })

    // Run migrations in production
    if (IS_PRODUCTION || IS_STAGING) await connection.runMigrations()
  } catch (err) {
    // Sentry
    console.log(err)
    process.exit(0)
  }
}
