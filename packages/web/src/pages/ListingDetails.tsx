import React, { FC } from "react"
import { RouteComponentProps, useParams } from "@reach/router"
import { Page } from "../components/shared/Page"
import { Box, Image, SimpleGrid } from "@chakra-ui/core/dist"
import { gql, useQuery } from "@apollo/client"
import { LoadSpinner } from "../components/shared/LoadSpinner"
import Moment from "moment"
import { useMe } from "../components/providers/MeProvider"

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
        id
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
  const me = useMe()

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
  const editable = data.findListing.author.id === me.id
  return (
    <Page>
      <SimpleGrid columns={2} p={"1em"}>
        <Box>Editable</Box>
        <Box>{editable ? "yes" : "no"}</Box>
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
        <Image
          src={data.findListing.imageUrl}
          alt={data.findListing.imageAlt}
        />
      </SimpleGrid>
    </Page>
  )
}
