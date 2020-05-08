import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/shared/Page"
import { ListingsSearchBox } from "../components/listing/ListingsSearchBox"
import { Stack } from "@chakra-ui/core"
import { BoxProps } from "@chakra-ui/core/dist/Box"
import { gql, useQuery } from "@apollo/client"
import { LoadSpinner } from "../components/shared/LoadSpinner"
import { Box } from "@chakra-ui/core/dist"
import { ListingsGrid } from "../components/listing/ListingsGrid"

export const ALL_LISTINGS = gql`
  query listingsForBox {
    listings {
      id
      description
      title
      author {
        firstName
        lastName
      }
      price
      baths
      beds
      reviews
      ratings
      imageAlt
      imageUrl
    }
  }
`

export const ListingsResults: React.FC<BoxProps> = () => {
  const { loading, error, data } = useQuery(ALL_LISTINGS)

  if (loading)
    return (
      <Page>
        <LoadSpinner />
      </Page>
    )
  if (error) {
    return (
      <Page>
        <Box>Error! {error.message}</Box>
      </Page>
    )
  }
  return (
    <React.Suspense fallback={<LoadSpinner />}>
      <ListingsGrid listings={data.listings} />
    </React.Suspense>
  )
}

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
