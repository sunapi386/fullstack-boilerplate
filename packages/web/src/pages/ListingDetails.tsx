import React, { FC } from "react"
import { RouteComponentProps, useParams } from "@reach/router"
import { Page } from "../components/Page"
import { Box, SimpleGrid } from "@chakra-ui/core/dist"
import { gql, useQuery } from "@apollo/client"
import { LoadSpinner } from "../components/LoadSpinner"
import Moment from "moment"

export const FIND_LISTING = gql`
  query GetListingById($id: String!) {
    findListing(id: $id) {
      createdAt
      updatedAt
      description
      title
      author {
        firstName
        lastName
      }
      imageUrl
      imageAlt
      beds
      baths
      price
      reviews
      ratings
    }
  }
`

export const ListingDetails: FC<RouteComponentProps> = () => {
  // User Profile
  const params = useParams()
  const { loading, error, data } = useQuery(FIND_LISTING, {
    variables: { id: params.listingId },
  })

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
    <Page>
      <SimpleGrid columns={2} spacing={1}>
        <Box>Title</Box> <Box>{data.findListing.title}</Box>
        <Box>Description</Box> <Box>{data.findListing.description}</Box>
        <Box>By</Box>
        <Box>
          {data.findListing.author.firstName} {data.findListing.author.lastName}
        </Box>
        <Box>ID</Box> <Box>{params.listingId}</Box>
        <Box>Created At</Box>
        <Box>{Moment(data.findListing.createdAt).fromNow()}</Box>
        <Box>Updated At</Box>
        <Box>{Moment(data.findListing.updatedAt).fromNow()}</Box>
        <Box>Beds</Box>
        <Box>{data.findListing.beds}</Box>
        <Box>Baths</Box>
        <Box>{data.findListing.baths}</Box>
        <Box>Price</Box>
        <Box>{data.findListing.price}</Box>
        <Box>Reviews</Box>
        <Box>{data.findListing.reviews}</Box>
        <Box>Ratings</Box>
        <Box>{data.findListing.ratings}</Box>
        <Box>Image</Box>
        <Box>{data.findListing.ImageUrl}</Box>
        <Box>Alt</Box>
        <Box>{data.findListing.imageAlt}</Box>
      </SimpleGrid>
    </Page>
  )
}
