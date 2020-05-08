import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/shared/Page"
import { ListingBox } from "../components/listing/ListingBox"
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
