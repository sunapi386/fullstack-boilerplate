import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@chakra-ui/core"
import { Page } from "../components/Page"

export const Dashboard: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Heading>Dashboard</Heading>
    </Page>
  )
}
