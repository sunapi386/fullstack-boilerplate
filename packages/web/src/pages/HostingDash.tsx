import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/Page"
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/core/dist"
import { TiStar } from "react-icons/all"
import { Link } from "../components/Link"

// const TabsBoard = () => {
//   return (
//     <Tabs w="100vw">
//       <TabList>
//         <Tab _selected={{ color: "black", bg: "#e6fffa" }} fontWeight="600">
//           World Map
//         </Tab>
//         <Tab _selected={{ color: "black", bg: "#e6fffa" }} fontWeight="600">
//           License Plate
//         </Tab>
//         <Tab _selected={{ color: "black", bg: "#e6fffa" }} fontWeight="600">
//           Complaints
//         </Tab>
//         <Tab _selected={{ color: "black", bg: "#e6fffa" }} fontWeight="600">
//           Users
//         </Tab>
//       </TabList>
//
//       <TabPanels>
//         <TabPanel>
//           <Box>
//             <WorldMap />
//           </Box>
//         </TabPanel>
//         <TabPanel>
//           <LicensePlates />
//         </TabPanel>
//         <TabPanel>
//           <Complaints />
//         </TabPanel>
//         <TabPanel>
//           <UserDetailsComponent />
//         </TabPanel>
//       </TabPanels>
//     </Tabs>
//   )
// }

const Card: FC = ({ children }) => {
  return (
    <Box p={5} shadow="sm" borderWidth="1px" m={1}>
      {children}
    </Box>
  )
}

const HorizontalBar = () => {
  return (
    <SimpleGrid columns={2} w="100%">
      <Flex align="center" justify="center">
        <Heading textAlign="center">Hosting Dashboard</Heading>
      </Flex>
      <Flex direction="row-reverse" align="flex-end">
        <Link to={"create_listing"}>
          <Button>Create new listing</Button>
        </Link>
      </Flex>
    </SimpleGrid>
  )
}

const RequestsCard = () => {
  return (
    <Card>
      <Box>
        <Heading fontSize="lg">Requests</Heading>
      </Box>
      <Box>
        <Text color="gray.500">
          Nothing you need to do right now - all set!
        </Text>
      </Box>
    </Card>
  )
}

const StatsCard = () => {
  return (
    <Card>
      <Box>
        <Heading fontSize="lg">Stats</Heading>
      </Box>
      <Box p={2}>
        <SimpleGrid columns={3} spacing={2} p={2}>
          <Stat>
            <StatLabel>Overall rating</StatLabel>
            <StatNumber>0</StatNumber>
            <StatHelpText />
          </Stat>
          <Stat>
            <StatLabel>Total reviews</StatLabel>
            <StatNumber>
              <Flex>
                0 <Box m={1} as={TiStar} size="28px" />
              </Flex>
            </StatNumber>
            <StatHelpText />
          </Stat>
          <Stat>
            <StatLabel> Response rate</StatLabel>
            <StatNumber>0 %</StatNumber>
            <StatHelpText />
          </Stat>
        </SimpleGrid>
        <Divider />
        <SimpleGrid columns={3} spacing={2} p={2}>
          <Stat>
            <StatLabel>April earnings</StatLabel>
            <StatNumber>$ 0</StatNumber>
            <StatHelpText />
          </Stat>
          <Stat>
            <StatLabel>30-day views</StatLabel>
            <StatNumber>0</StatNumber>
            <StatHelpText />
          </Stat>
          <Stat>
            <StatLabel>30-day bookings</StatLabel>
            <StatNumber>0</StatNumber>
            <StatHelpText />
          </Stat>
        </SimpleGrid>
      </Box>
    </Card>
  )
}

const ReservationsCard = () => {
  return (
    <Card>
      <Box>
        <Heading fontSize="lg">Reservations</Heading>
      </Box>
      <Box>No upcoming reservations</Box>
    </Card>
  )
}

const NotificationCard = () => {
  return (
    <Card>
      <Box>
        <Heading fontSize="lg">Notifications</Heading>
      </Box>
      <Box>No messages</Box>
    </Card>
  )
}

const StackOfInterest = () => {
  return (
    <Stack spacing={8}>
      <RequestsCard />
      <StatsCard />
      <ReservationsCard />
      <NotificationCard />
    </Stack>
  )
}

export const HostingDash: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Box w="95%">
        <Stack m={2}>
          <HorizontalBar />
          <Divider />
          <StackOfInterest />
        </Stack>
      </Box>
    </Page>
  )
}
