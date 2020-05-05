import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/shared/Page"
import { ListingsSearchBox } from "../components/ListingsSearchBox"
import { ListingsResults } from "../components/ListingsResults"
import { Stack } from "@chakra-ui/core"

export const RentingDash: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Stack>
        <ListingsSearchBox />
        <ListingsResults />
      </Stack>
    </Page>
  )
}
