import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/Page"
import { RentalBox } from "../components/RentalBox"
import { WorldMap } from "../components/WorldMap"

export const SearchPage: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <WorldMap />
      <RentalBox />
      <RentalBox />
    </Page>
  )
}
