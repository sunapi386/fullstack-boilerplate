let env: string

const hostname = window?.location?.hostname
if (hostname === "sunpi.co") {
  env = "production"
} else {
  env = "development"
}

export const environment = env

export const production = env === "production"

export const apiUrl = production
  ? "https://fancystack.herokuapp.com/graphql"
  : "http://localhost:5555/graphql"

export const webUrl = production ? "https://sunpi.co" : "http://localhost:3000"
