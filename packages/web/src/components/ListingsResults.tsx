import React from "react"
import { Box } from "@chakra-ui/core/dist"
import { BoxProps } from "@chakra-ui/core/dist/Box"
import { LoadSpinner } from "./LoadSpinner"
import { ListingBox, ListingShortAd } from "./ListingBox"
import { gql, useQuery } from "@apollo/client"
import { Page } from "./Page"

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
    <Box border="1px" borderRadius="4px" m="1em" w="90%" h="80vh">
      {listings.map((listingAd, key) => (
        <ListingBox key={key} property={listingAd} />
      ))}
    </Box>
  )
}

export const ListingsResults: React.FC<BoxProps> = () => {
  // const singlelisting = {
  //   imageUrl: "https://bit.ly/2Z4KKcF",
  //   imageAlt: "Backend view of modern home with pool",
  //   beds: 3,
  //   baths: 2,
  //   title: "Backend home in city center in the heart of historic Los Angeles",
  //   formattedPrice: "$1,900.00",
  //   reviewCount: 34,
  //   rating: 4,
  // }

  // const listings: [ListingShortAd] = [singlelisting]
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
