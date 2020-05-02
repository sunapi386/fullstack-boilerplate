import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/shared/Page"
import { ListingsSearchBox } from "../components/ListingsSearchBox"
import { ListingsResults } from "../components/ListingsResults"

export const RentingDash: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <ListingsSearchBox />
      <ListingsResults />
    </Page>
  )
}
