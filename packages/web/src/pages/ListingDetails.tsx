import React, { FC } from "react"
import { RouteComponentProps, useParams } from "@reach/router"
import { Page } from "../components/shared/Page"
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/core/dist"
import { gql, useQuery } from "@apollo/client"
import { LoadSpinner } from "../components/shared/LoadSpinner"
import Moment from "moment"
import { useMe } from "../components/providers/MeProvider"
import { Link } from "../components/shared/Link"
import { useToast } from "../lib/hooks/useToast"

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
  const me = useMe()
  const toast = useToast()

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
  const listing = data.findListing
  const editable = listing.author.id === me.id

  const editListing = () => {
    toast({
      status: "error",
      duration: 3000,
      description: "Edit listing not implemented yet",
    })
  }

  const bookNow = () => {
    toast({
      status: "error",
      duration: 3000,
      description: "Book listing not implemented yet",
    })
  }

  return (
    <Page>
      <Stack spacing={2} p={"1em"}>
        <SimpleGrid
          borderRadius="4px"
          mb="1em"
          minChildWidth="200px"
          spacing="1em"
          shadow="md"
          borderWidth="1px"
          p={2}
        >
          <Image
            src={listing.imageUrl}
            alt={listing.imageAlt}
            borderRadius="4px"
          />

          <Stack spacing={2} m="1px" p="1em">
            <Box d="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <Icon
                    name="star"
                    key={i}
                    color={i < listing.ratings ? "teal.500" : "gray.300"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {listing.reviews} reviews
              </Box>
            </Box>
            <Flex alignContent="center">
              $ {listing.price} per night {listing.beds} bed {listing.baths}{" "}
              bath
            </Flex>{" "}
            <Text fontSize="lg" textTransform="uppercase">
              {listing.title}
            </Text>
            <Text mt={4}>{listing.description}</Text>
            <Link to={"/u/" + listing.author.id}>
              <Text fontStyle="italic">
                Hosted by {listing.author.firstName} {listing.author.lastName}
              </Text>
            </Link>
            <Box>
              Listed {Moment(listing.createdAt).fromNow()} and updated{" "}
              {Moment(listing.updatedAt).fromNow()}
            </Box>
          </Stack>

          <Stack>
            <Button
              m="1em"
              variant={editable ? "outline" : "solid"}
              onClick={editable ? editListing : bookNow}
            >
              {editable ? "Edit listing" : "Book now"}
            </Button>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Page>
  )
}
