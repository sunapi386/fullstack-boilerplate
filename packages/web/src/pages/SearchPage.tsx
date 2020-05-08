import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/shared/Page"
import { ListingCard } from "../components/listing/ListingCard"
import { WorldMap } from "../components/WorldMap"

export const SearchPage: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <WorldMap />
      {/*<ListingCard />*/}
      {/*<ListingCard />*/}
    </Page>
  )
}
