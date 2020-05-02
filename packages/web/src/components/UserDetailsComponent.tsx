import React, { FC } from "react"
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
} from "@chakra-ui/core/dist"
import { RouteComponentProps, useParams } from "@reach/router"

const PeopleSmallBox = ({ title, text }: { title: string; text: string }) => {
  // add a custom lighter grey color here
  const { colorMode } = useColorMode()
  const color = { light: "black", dark: "white" }

  return (
    <Box
      w="350px"
      borderColor={color[colorMode]}
      m="2em"
      color={color[colorMode]}
    >
      <Box textAlign="center" overflow="hidden" fontWeight="600">
        {title}
      </Box>
      {/*<Divider orientation="horizontal"/>*/}
      <Box textAlign="center" overflow="hidden">
        {text}
      </Box>
    </Box>
  )
}

const UserInfoSummaryBarTop = () => {
  // id = "noId", email = "noEmail", phoneNumber = "555", assistantId = "noId"
  return (
    <Flex justifyContent="center">
      <PeopleSmallBox title={"Customer ID"} text={"1234567890"} />
      <PeopleSmallBox title={"Email"} text={"sunapi386@gmail.com"} />
      <PeopleSmallBox title={"Phone"} text={"(408)555-1234"} />
      <PeopleSmallBox title={"Assistant ID"} text={"0987654321"} />
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
const UserComplaints: FC = () => {
  return (
    <Box>
      <Text>Complaints</Text>
    </Box>
  )
}
const UserDocuments: FC = () => {
  return (
    <Box>
      <Text>Documents</Text>
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
        <TabList mb="1em" minW="800px">
          <Tab fontWeight="600">Overview</Tab>
          <Tab fontWeight="600">Listings</Tab>
          <Tab fontWeight="600">Complaints</Tab>
          <Tab fontWeight="600">Documents</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserOverview />
          </TabPanel>
          <TabPanel>
            <UserListings />
          </TabPanel>
          <TabPanel>
            <UserComplaints />
          </TabPanel>
          <TabPanel>
            <UserDocuments />
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
