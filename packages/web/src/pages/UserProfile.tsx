import React, { FC } from "react"
import { RouteComponentProps, useParams } from "@reach/router"
import { Page } from "../components/Page"
import { UserDetailsComponent } from "../components/UserDetailsComponent"

export const UserProfile: FC<RouteComponentProps> = () => {
  // User Profile
  const params = useParams()
  return (
    <Page>
      <UserDetailsComponent path={params.userId} />
    </Page>
  )
}
