import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/Page"
import { ListingsSearchBox } from "../components/ListingsSearchBox"

export const RentingDash: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <ListingsSearchBox />
    </Page>
  )
}
