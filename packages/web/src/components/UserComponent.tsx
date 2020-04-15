import React, { FC } from "react"
import { Box, Flex, Text, Stack } from "@chakra-ui/core/dist"
import { RouteComponentProps, useParams } from "@reach/router"

function Feature({ title, desc, ...rest }: { title: string; desc: string }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Text fontSize="xl">{title}</Text>
      <Text mt={4}>{desc}</Text>
    </Box>
  )
}

function StackEx() {
  return (
    <Stack spacing={8}>
      <Feature title="User Component" desc="Who I am" />
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
export const UserComponent: FC<RouteComponentProps> = () => {
  const params = useParams()
  const userId = params.userId

  return (
    <Flex>
      <Text>{userId}</Text>
      <StackEx />
    </Flex>
  )
}
