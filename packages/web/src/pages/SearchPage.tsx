import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/Page"
import { ListingBox } from "../components/ListingBox"
import { WorldMap } from "../components/WorldMap"

export const SearchPage: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <WorldMap />
      {/*<ListingBox />*/}
      {/*<ListingBox />*/}
    </Page>
  )
}
