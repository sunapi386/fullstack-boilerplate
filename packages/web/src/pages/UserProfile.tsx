import React, { FC } from "react"
import { RouteComponentProps, useParams } from "@reach/router"
import { Heading, Text } from "@chakra-ui/core/dist"
import { Page } from "../components/Page"
import { UserComponent } from "../components/UserComponent"

export const UserProfile: FC<RouteComponentProps> = () => {
  // User Profile
  const params = useParams()
  return (
    <Page>
      <Heading>User Profile Page</Heading>
      <Text>User Profile Page for {params.userId}</Text>
      <UserComponent path={params.userId} />
    </Page>
  )
}
