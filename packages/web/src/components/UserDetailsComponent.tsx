import React, { FC } from "react"
import {
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

const UserInfoSummaryBarTop = () => {
  // id = "noId", email = "noEmail", phoneNumber = "555", assistantId = "noId"
  return (
    <Flex justifyContent="center">
      <SimpleGrid minChildWidth="200px" spacing="1em" m="1em" w="90%">
        <PeopleSmallBox
          title={"Customer ID"}
          text={"57a94eac-dedd-4465-83ca-f7849f66a27d"}
        />
        <PeopleSmallBox title={"Email"} text={"sunapi386@gmail.com"} />
        <PeopleSmallBox title={"Phone"} text={"(408)555-1234"} />
        <PeopleSmallBox title={"Assistant ID"} text={"0987654321"} />
      </SimpleGrid>
    </Flex>
  )
}

const UserOverview: FC = () => {
  return (
    <Box>
      <Text>Overview</Text>
    </Box>
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
          <Tab fontWeight="semibold">Overview</Tab>
          <Tab fontWeight="600">Listings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserOverview />
          </TabPanel>
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
  console.log(params)
  return (
    <Box w="100%">
      <UserInfoSummaryBarTop />
      <UserInfoTabs />
    </Box>
  )
}
