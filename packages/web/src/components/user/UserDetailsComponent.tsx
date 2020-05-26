import React, { FC } from "react"
import { Box, Button, Flex } from "@chakra-ui/core/dist"
import { RouteComponentProps, useParams } from "@reach/router"
import { gql, useQuery } from "@apollo/client"
import { Card, UserProfileCard } from "../shared/Card"
import { Page } from "../shared/Page"
import { LoadSpinner } from "../shared/LoadSpinner"
import { Link } from "../shared/Link"
import { ListingsGrid } from "../listing/ListingsGrid"

export const PUBLIC_USER = gql`
  query GetPublicUser($id: String!) {
    user(id: $id) {
      firstName
      lastName
      email
      avatarUrl
    }
  }
`

export const MY_LISTINGS = gql`
  query myListings {
    me {
      listings {
        imageUrls
        beds
        baths
        title
        price
        reviews
        ratings
        id
      }
    }
  }
`

export const UserListings: FC = () => {
  const { loading, error, data } = useQuery(MY_LISTINGS)
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
  if (!data.me.listings) {
    return (
      <Link to={"/hosting/create_listing"} _hover={{ outline: "none" }}>
        <Flex justifyContent="center" align="center" justify="center">
          Oops, you haven't made any listings yet.
          <Button>Make a listing here.</Button>
        </Flex>
      </Link>
    )
  }
  return (
    <React.Suspense fallback={<LoadSpinner />}>
      <Card title="My Listings">
        <ListingsGrid listings={data.me.listings} />
      </Card>
    </React.Suspense>
  )
}

// Need user object to be passed here
export const UserDetailsComponent: FC<RouteComponentProps> = () => {
  const params = useParams()
  return (
    <Box w="100%">
      <UserProfileCard userId={params.userId} />
    </Box>
  )
}
