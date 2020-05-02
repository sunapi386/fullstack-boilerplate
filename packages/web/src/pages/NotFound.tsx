import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Box, Button, Heading, Text } from "@chakra-ui/core/dist"
import { Link } from "../components/shared/Link"
import { Page } from "../components/shared/Page"

export const NotFound: FC<RouteComponentProps> = () => {
  // return <Redirect to="/" noThrow={true} />
  return (
    <Page>
      <Box p={2}>
        <Heading m={2}>404</Heading>
        <Text m={2}>
          We couldn't find the page you requested. It's possible that the page
          was moved, or it never existed.
        </Text>
        <Link to={"/"}>
          <Button>Return to Home</Button>
        </Link>
      </Box>
    </Page>
  )
}
