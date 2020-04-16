import React, { FC } from "react"
import { Link } from "./Link"
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Grid,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  useColorMode,
} from "@chakra-ui/core/dist"
import { useMe } from "./providers/MeProvider"
import { RouteComponentProps } from "@reach/router"
import { useLogout } from "../lib/hooks/useLogout"

import { useLocalStorage } from "@noquarter/hooks"

const LeftTitle = () => {
  return (
    <Box m={2}>
      <Heading>Fancy Co.</Heading>
    </Box>
  )
}

const RightNav = () => {
  const me = useMe()
  const [, setColorMode] = useLocalStorage<"dark" | "light">(
    "fullstack:darkmode",
    "dark",
  )
  const { colorMode, toggleColorMode } = useColorMode()
  const toggleColor = () => {
    setColorMode(colorMode === "light" ? "dark" : "light")
    toggleColorMode()
  }
  const logout = useLogout()

  return (
    <Flex justifyContent={"flex-end"} m={1}>
      <Link to="/" p="2">
        Home
      </Link>
      <Link to="/roadcam" p="2">
        RoadCam
      </Link>
      <Link to="/about" p="2">
        About
      </Link>
      <Menu>
        <MenuButton ml="3">
          <Avatar name={me.firstName + " " + me.lastName} size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link to={"/u/" + me.id} w={"100%"}>
              {me.firstName} {me.lastName}
            </Link>
          </MenuItem>

          <MenuItem onClick={toggleColor}>Toggle Color Mode</MenuItem>

          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export const NavBar: FC<RouteComponentProps> = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} m="1">
      <LeftTitle />
      <RightNav />
    </Grid>
  )
}
