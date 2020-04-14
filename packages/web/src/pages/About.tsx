import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@chakra-ui/core"
import { Page } from "../components/Page"

export const About: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Heading>About Page</Heading>
    </Page>
  )
}
