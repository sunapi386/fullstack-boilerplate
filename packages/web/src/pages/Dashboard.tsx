import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@chakra-ui/core"
import { Page } from "../components/Page"
import { Box } from "@chakra-ui/core/dist"
import { RentalBox } from "../components/RentalBox"
import { WorldMap } from "../components/WorldMap"

export const Dashboard: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Box w="250px" mb="1em">
        <Heading>Dashboard</Heading>
      </Box>
      <WorldMap />
      <RentalBox />
      <RentalBox />
      <RentalBox />
    </Page>
  )
}
