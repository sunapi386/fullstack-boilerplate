import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@chakra-ui/core/dist"
import { Page } from "../components/Page"

export const Settings: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Heading>Settings Page</Heading>
    </Page>
  )
}
