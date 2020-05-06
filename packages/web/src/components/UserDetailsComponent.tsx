import React, { FC } from "react"
import {
  Avatar,
  Box,
  Flex,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
} from "@chakra-ui/core/dist"
import { RouteComponentProps, useParams } from "@reach/router"
import { gql, useQuery } from "@apollo/client"
import { LoadSpinner } from "./shared/LoadSpinner"

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

const PeopleSmallBox = ({
  title,
  text,
  ...params
}: {
  title: string
  text: string
}) => {
  // add a custom lighter grey color here
  const { colorMode } = useColorMode()
  const color = { light: "black", dark: "white" }

  return (
    <Box
      borderColor={color[colorMode]}
      m="1em"
      color={color[colorMode]}
      {...params}
    >
      <Box textAlign="center" overflow="auto" fontWeight="semibold">
        {title}
      </Box>
      {/*<Divider orientation="horizontal"/>*/}
      <Box textAlign="center" overflow="auto" fontSize="sm">
        {text}
      </Box>
    </Box>
  )
}

const UserInfoSummaryBarTop = ({ userId }: { userId: string }) => {
  const result = useQuery(PUBLIC_USER, { variables: { id: userId } })
  const { loading, data } = result
  if (loading) {
    return <LoadSpinner />
  }
  const fullName = `${data.user.firstName} ${data.user.lastName}`
  return (
    <Flex justifyContent="center">
      <SimpleGrid minChildWidth="100px" spacing="1em" m="1em" w="90%">
        <Avatar
          m="1em"
          textAlign="center"
          name={fullName}
          src={data.user.avatarUrl}
        />
        <PeopleSmallBox title={"ID"} text={userId} />
        <PeopleSmallBox title={"Name"} text={fullName} />
        <PeopleSmallBox title={"Email"} text={data.user.email} />
        {/*<PeopleSmallBox title={"Phone"} text={data.user.phone} />*/}
      </SimpleGrid>
    </Flex>
  )
}

const UserListings: FC = () => {
  return (
    <Box>
      <Text>Listings</Text>
    </Box>
  )
}

const UserInfoTabs = () => {
  return (
    <Box m="1em">
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab fontWeight="semibold">Listings</Tab>
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
  return (
    <Box w="100%">
      <UserInfoSummaryBarTop userId={params.userId} />
      <UserInfoTabs />
    </Box>
  )
}
