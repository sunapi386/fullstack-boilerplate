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
import { RouteComponentProps } from "@reach/router"

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

const PeopleShort = () => {
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

const InfoPerson: FC = () => {
  return (
    <Box>
      <Text>Person</Text>
    </Box>
  )
}
const InfoComplaints: FC = () => {
  return (
    <Box>
      <Text>Complaints</Text>
    </Box>
  )
}
const InfoDocuments: FC = () => {
  return (
    <Box>
      <Text>Documents</Text>
    </Box>
  )
}
const InfoListings: FC = () => {
  return (
    <Box>
      <Text>Listings</Text>
    </Box>
  )
}
const InfoFinances: FC = () => {
  return (
    <Box>
      <Text>Finances</Text>
    </Box>
  )
}
const InfoEmployment: FC = () => {
  return (
    <Box>
      <Text>Employment</Text>
    </Box>
  )
}

const PeopleTabs = () => {
  return (
    <Box m="1em">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em" minW="800px">
          <Tab fontWeight="600">Person Overview</Tab>
          <Tab fontWeight="600">Listings</Tab>
          <Tab fontWeight="600">Chat History</Tab>
          <Tab fontWeight="600">Account Finances</Tab>
          <Tab fontWeight="600">ID Documents</Tab>
          <Tab fontWeight="600">Employment</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <InfoPerson />
          </TabPanel>
          <TabPanel>
            <InfoListings />
          </TabPanel>
          <TabPanel>
            <InfoComplaints />
          </TabPanel>
          <TabPanel>
            <InfoFinances />
          </TabPanel>
          <TabPanel>
            <InfoDocuments />
          </TabPanel>
          <TabPanel>
            <InfoEmployment />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

// Need user object to be passed here
export const UserDetailsComponent: FC<RouteComponentProps> = () => {
  return (
    <Box w="100%">
      <PeopleShort />
      <PeopleTabs />
    </Box>
  )
}
