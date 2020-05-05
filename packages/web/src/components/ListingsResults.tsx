import React from "react"
import { Box, SimpleGrid } from "@chakra-ui/core/dist"
import { BoxProps } from "@chakra-ui/core/dist/Box"
import { LoadSpinner } from "./shared/LoadSpinner"
import { ListingBox, ListingShortAd } from "./ListingBox"
import { gql, useQuery } from "@apollo/client"
import { Page } from "./shared/Page"

// Fetch the data from backend
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

const Listings = ({ listings }: { listings: [ListingShortAd] }) => {
  return (
    <SimpleGrid minChildWidth="260px" spacing="1em" m="1em" w="90%" h="80vh">
      {listings.map((listingAd, key) => (
        <ListingBox key={key} property={listingAd} />
      ))}
    </SimpleGrid>
  )
}

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
      <Listings listings={data.listings} />
    </React.Suspense>
  )
}
