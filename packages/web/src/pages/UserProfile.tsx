import React, { FC } from "react"
import { RouteComponentProps, useParams } from "@reach/router"
import { Page } from "../components/Page"
import { UserComponent } from "../components/UserComponent"

export const UserProfile: FC<RouteComponentProps> = () => {
  // User Profile
  const params = useParams()
  return (
    <Page>
      <UserComponent path={params.userId} />
    </Page>
  )
}
