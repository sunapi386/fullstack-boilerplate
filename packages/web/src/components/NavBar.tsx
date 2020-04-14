import React from "react"
import { Link } from "./Link"
import { Avatar, Box, Divider, Flex, Heading, Grid } from "@chakra-ui/core/dist"
import { useMe } from "./providers/MeProvider"

const LeftTitle = () => {
  return (
    <Box m={2}>
      <Heading>Fancy Co.</Heading>
    </Box>
  )
}

const RightNav = () => {
  const me = useMe()
  return (
    <Flex justifyContent={"flex-end"} m={1} p={3}>
      <Link to="/">Home</Link>
      <Divider p={1} orientation="vertical" color="none" />
      <Link to="/about">About</Link>
      <Divider p={1} orientation="vertical" />
      <Link to="/settings">
        <Avatar name={me.firstName + " " + me.lastName} size="sm" />
      </Link>
    </Flex>
  )
}

export const NavBar = () => {
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={6}
      m="1"
      borderBottom="1px"
      borderBottomColor={"DarkSlateGray"}
    >
      <LeftTitle />
      <RightNav />
    </Grid>
  )
}
