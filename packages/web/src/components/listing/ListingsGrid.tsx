import React from "react"
import { SimpleGrid } from "@chakra-ui/core/dist"
import { ListingProps } from "./ListingProps"
import { ListingCard } from "./ListingCard"

export const ListingsGrid = ({ listings }: { listings: [ListingProps] }) => {
  return (
    <SimpleGrid minChildWidth="260px" spacing="1em" m="1em" w="90%">
      {listings.map((listingAd, key) => (
        <ListingCard key={key} property={listingAd} />
      ))}
    </SimpleGrid>
  )
}
