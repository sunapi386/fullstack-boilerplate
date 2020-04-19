import React, { FC } from "react"
import { Link } from "./Link"
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SimpleGrid,
  Switch,
  useColorMode,
} from "@chakra-ui/core/dist"
import { useMe } from "./providers/MeProvider"
import { RouteComponentProps } from "@reach/router"
import { useLogout } from "../lib/hooks/useLogout"
import { MdMenu } from "react-icons/md"

import { useLocalStorage } from "@noquarter/hooks"
import {
  FaHome,
  FiCalendar,
  IoIosLogOut,
  WiMoonAltWaningCrescent2,
} from "react-icons/all"

const LeftTitle = () => {
  return (
    <Link _hover={{ outline: "none" }} _focus={{ outline: "none" }} to="/">
      <Box m={2}>
        <Heading>Fancy Co.</Heading>
      </Box>
    </Link>
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

  const UserProfileMenuItem = () => {
    return (
      <Box m="1em">
        <Link
          to={"/u/" + me.id}
          w={"100%"}
          _hover={{ outline: "none" }}
          _focus={{ outline: "none" }}
        >
          <SimpleGrid columns={2}>
            <Avatar name={me.firstName + " " + me.lastName} />
            <Box>
              <Flex>
                {me.firstName} {me.lastName}
              </Flex>
              <Flex fontSize="sm">See your profile</Flex>
            </Box>
          </SimpleGrid>
        </Link>
      </Box>
    )
  }

  return (
    <Flex justifyContent={"flex-end"} m={1}>
      <Link to="/" p="2">
        <Box as={FaHome} size="32px" />
      </Link>
      <Link to="/hosting" p="2">
        <Box as={FiCalendar} size="32px" />
      </Link>
      <Menu>
        <MenuButton p="2">
          <Box as={MdMenu} size="32px" />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <UserProfileMenuItem />
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={toggleColor}>
            <Box as={WiMoonAltWaningCrescent2} size="32px" />
            <Box ml={1}>Dark</Box>
            <Flex w="70%" direction="row-reverse">
              <Switch isChecked={colorMode !== "light"} size="lg" />
            </Flex>
          </MenuItem>
          <MenuItem onClick={logout}>
            <Box as={IoIosLogOut} size="32px" />
            <Box ml={1}>Logout</Box>
          </MenuItem>
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
