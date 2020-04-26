import "reflect-metadata"
import express from "express"
import morgan from "morgan"

import { APP_ENV, PORT } from "./config"

export class Server {
  private readonly _app: express.Application

  constructor() {
    this._app = express()
      .enable("trust proxy")
      .use(morgan("dev"))
  }

  protected get app(): express.Application {
    return this._app
  }

  async start() {
    this._app.listen(PORT, () => {
      console.log(
        `Server started in APP_ENV=${APP_ENV} mode, at http://localhost:${PORT} 🚀`,
      )
    })
  }
}
