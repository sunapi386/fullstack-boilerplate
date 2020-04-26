let env: string

// hostname: what the browser tells me my page's URL location is
export const myDomains = [
  "https://sunpi.co",
  "http://10.0.1.21",
  "http://73.158.125.228",
]

const hostname = window?.location?.hostname
if (myDomains.includes(hostname)) {
  env = "production"
} else {
  env = "development"
}
// I am on production if I am where I should be

export const environment = env

export const production = env === "production"

export const apiUrl = production
  ? "http://10.0.1.21:5555/graphql"
  : "https://fancystack.herokuapp.com/graphql"

export const myDomainDefault = "https://sunpi.co"

export const webUrl = production ? myDomainDefault : "http://10.0.1.21:3000"
