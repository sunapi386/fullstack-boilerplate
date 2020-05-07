import React, { FC } from "react"
import { RouteComponentProps, useParams } from "@reach/router"
import { Page } from "../components/shared/Page"
import { UserDetailsComponent } from "../components/UserDetailsComponent"
import { UserProfilePictureUploadEditor } from "../components/UserProfilePictureUploadEditor"
import { useMe } from "../components/providers/MeProvider"
import { Stack } from "@chakra-ui/core"
import { ValidateUser } from "../components/ValidateUser"

export const UserProfile: FC<RouteComponentProps> = () => {
  // User Profile
  const params = useParams()
  const me = useMe()
  return (
    <Page>
      <Stack w="80%">
        <UserDetailsComponent path={params.userId} />
        <ValidateUser user={me} />
        <UserProfilePictureUploadEditor user={me} />
      </Stack>
    </Page>
  )
}
