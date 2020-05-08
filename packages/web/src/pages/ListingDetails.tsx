import React, { FC } from "react"
import { RouteComponentProps, useParams } from "@reach/router"
import { Page } from "../components/shared/Page"
import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/core/dist"
import { gql, useQuery } from "@apollo/client"
import { LoadSpinner } from "../components/shared/LoadSpinner"
import Moment from "moment"
import { useMe } from "../components/providers/MeProvider"
import { Link } from "../components/shared/Link"
import { TiStar } from "react-icons/all"
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
  const editable = data.findListing.author.id === me.id

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
          minChildWidth="200px"
          spacing="1em"
          m="1em"
          w="90%"
          shadow="md"
          borderWidth="1px"
        >
          <Image
            src={data.findListing.imageUrl}
            alt={data.findListing.imageAlt}
          />

          <Stack>
            <Text fontSize="lg">{data.findListing.title}</Text>
            <Text mt={4}>{data.findListing.description}</Text>
            <Link to={"/u/" + data.findListing.author.id}>
              Hosted by {data.findListing.author.firstName}{" "}
              {data.findListing.author.lastName}
            </Link>
            <Box>Listed {Moment(data.findListing.createdAt).fromNow()}</Box>
            <Box>
              Last updated {Moment(data.findListing.updatedAt).fromNow()}
            </Box>
          </Stack>

          <Stack>
            <Box>
              {data.findListing.beds} bed {data.findListing.baths} baths
            </Box>
            <Box>$ {data.findListing.price} / night</Box>
            <Stat>
              <StatLabel>Reviews</StatLabel>
              <Flex>
                <StatNumber>{data.findListing.ratings}</StatNumber>
                <Box m={1} as={TiStar} size="28px" />
                <Text>from {data.findListing.ratings} ratings</Text>
              </Flex>
              <StatHelpText />
            </Stat>

            <Button
              m="1em"
              variant="outline"
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
