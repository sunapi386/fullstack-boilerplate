import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Box, Heading, Stack, Text } from "@chakra-ui/core/dist"
import { Page } from "../components/Page"

function Feature({ title, desc, ...rest }: { title: string; desc: string }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  )
}

function StackEx() {
  return (
    <Stack spacing={8}>
      <Feature
        title="Plan Money"
        desc="The future can be even brighter but a goal without a plan is just a wish"
      />
      <Feature
        title="Save Money"
        desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process"
      />
    </Stack>
  )
}

export const UserProfile: FC<RouteComponentProps> = () => {
  // User Profile
  return (
    <Page>
      <Heading>User Profile Page</Heading>
      <StackEx />
    </Page>
  )
}
