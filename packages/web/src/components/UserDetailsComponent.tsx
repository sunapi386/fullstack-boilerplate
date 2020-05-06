import React, { FC } from "react"
import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/core/dist"
import { RouteComponentProps, useParams } from "@reach/router"
import { gql, useQuery } from "@apollo/client"
import { LoadSpinner } from "./shared/LoadSpinner"
import { Page } from "./shared/Page"
import { ListingsGrid } from "./ListingsResults"
import { Link } from "./shared/Link"
import { UserProfileCard } from "./shared/Card"
import { ValidateUser } from "./ValidateUser"
import { useMe } from "./providers/MeProvider"
import { MeFragment } from "../lib/graphql"

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
        imageUrl
        imageAlt
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

const UserListings: FC = () => {
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
      <ListingsGrid listings={data.me.listings} />
    </React.Suspense>
  )
}

const UserInfoTabs = ({ user }: { user: MeFragment }) => {
  return (
    <Box m="1em">
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab fontWeight="semibold">Listings by {user.firstName}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserListings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

// Need user object to be passed here
export const UserDetailsComponent: FC<RouteComponentProps> = () => {
  const params = useParams()
  const me = useMe()
  return (
    <Box w="100%">
      <ValidateUser user={me} />
      <UserProfileCard userId={params.userId} />
      <UserInfoTabs user={me} />
    </Box>
  )
}
