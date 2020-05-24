import React, { FC } from "react"
import { RouteComponentProps, useParams } from "@reach/router"
import { Page } from "../components/shared/Page"
import { UserDetailsComponent } from "../components/user/UserDetailsComponent"
import { useMe } from "../components/providers/MeProvider"
import { Stack } from "@chakra-ui/core"
import { UserValidator } from "../components/user/UserValidator"

export const UserProfile: FC<RouteComponentProps> = () => {
  // User Profile
  const params = useParams()
  const me = useMe()
  return (
    <Page>
      <Stack w="80%">
        <UserDetailsComponent path={params.userId} />
        <UserValidator user={me} />
      </Stack>
    </Page>
  )
}
