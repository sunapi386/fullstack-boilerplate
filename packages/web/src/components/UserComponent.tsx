import React, { FC } from "react"
import {
  Box,
  Flex,
  Text,
  Stack,
  SimpleGrid,
  Heading,
  TabPanels,
  Tabs,
  TabPanel,
  TabList,
  Tab,
  Grid,
  Divider,
} from "@chakra-ui/core/dist"
import { RouteComponentProps, useParams } from "@reach/router"
import { User } from "../lib/graphql"
import { useMe } from "./providers/MeProvider"

const PeopleSmallBox = ({ title, text }: { title: string; text: string }) => {
  return (
    <Box w="250px" mb="1em">
      <Box textAlign="center" overflow="hidden">
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
    <Flex>
      <PeopleSmallBox title={"ID"} text={"1234567890"} />
      <PeopleSmallBox title={"email"} text={"sunapi386@gmail.com"} />
      <PeopleSmallBox title={"phone"} text={"4085551234"} />
      <PeopleSmallBox title={"assistant ID"} text={"0987654321"} />
    </Flex>
  )
}

const PeopleTabs = () => {
  return (
    <Box m="1em">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em" minW="800px">
          <Tab>Person Overview</Tab>
          <Tab>Complaints</Tab>
          <Tab>Documents</Tab>
          <Tab>Listings</Tab>
          <Tab>Pending Questionnaires</Tab>
          <Tab>Biographical</Tab>
          <Tab>Employment</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

// Need user object to be passed here
export const UserComponent: FC<RouteComponentProps> = () => {
  return (
    <Box w="100%">
      <PeopleShort />
      <PeopleTabs />
    </Box>
  )
}
