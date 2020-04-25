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
        <Box>ID</Box> <Box>{params.listingId}</Box>
        <Box>Created At</Box>{" "}
        <Box>{Moment(data.findListing.createdAt).fromNow()}</Box>
        <Box>Updated At</Box>{" "}
        <Box>{Moment(data.findListing.updatedAt).fromNow()}</Box>
      </SimpleGrid>
    </Page>
  )
}
