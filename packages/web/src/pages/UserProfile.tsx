import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@chakra-ui/core/dist"
import { Page } from "../components/Page"
import { UserComponent } from "../components/UserComponent"

export const UserProfile: FC<RouteComponentProps> = () => {
  // User Profile
  return (
    <Page>
      <Heading>User Profile Page</Heading>
      <UserComponent />
    </Page>
  )
}
