import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/shared/Page"
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
import { Link } from "../components/shared/Link"
import { Card } from "../components/shared/Card"
import { WorldMap } from "../components/WorldMap"
import { UserListings } from "../components/user/UserDetailsComponent"

const HorizontalBar = () => {
  return (
    <SimpleGrid columns={2} w="100%">
      <Flex align="center" justify="center">
        <Heading textAlign="center">Hosting Dashboard</Heading>
      </Flex>
      <Flex direction="row-reverse" align="flex-end">
        <Link
          _hover={{ color: "blue.500", outline: "none" }}
          to={"create_listing"}
        >
          <Button>Create new listing</Button>
        </Link>
      </Flex>
    </SimpleGrid>
  )
}

const RequestsCard = () => {
  return (
    <Card title="Requests">
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
    <Card title="Stats">
      <Box p={2}>
        <SimpleGrid columns={3} spacing={2} p={2}>
          <Stat>
            <StatLabel>Overall rating</StatLabel>
            <Flex>
              <StatNumber>4</StatNumber>
              <Box m={1} as={TiStar} size="28px" />
            </Flex>
            <StatHelpText />
          </Stat>
          <Stat>
            <StatLabel>Total reviews</StatLabel>
            <StatNumber>20</StatNumber>
            <StatHelpText />
          </Stat>
          <Stat>
            <StatLabel>Avg response time </StatLabel>
            <StatNumber>9 min</StatNumber>
            <StatHelpText>Responds within this time on average</StatHelpText>
          </Stat>
        </SimpleGrid>
        <Divider />
        <SimpleGrid columns={3} spacing={2} p={2}>
          <Stat>
            <StatLabel>April earnings</StatLabel>
            <StatNumber>$ 2100</StatNumber>
            <StatHelpText />
          </Stat>
          <Stat>
            <StatLabel>30-day views</StatLabel>
            <StatNumber>20</StatNumber>
            <StatHelpText />
          </Stat>
          <Stat>
            <StatLabel>30-day bookings</StatLabel>
            <StatNumber>40</StatNumber>
            <StatHelpText />
          </Stat>
        </SimpleGrid>
      </Box>
    </Card>
  )
}

const ReservationsCard = () => {
  return (
    <Card title="Reservations">
      <Box>No upcoming reservations</Box>
    </Card>
  )
}

const NotificationCard = () => {
  return (
    <Card title="Notifications">
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
          <Divider m={2} />
          <StackOfInterest />
          <UserListings />
          <Card title="Listings Map">
            <WorldMap />
          </Card>
        </Stack>
      </Box>
    </Page>
  )
}
