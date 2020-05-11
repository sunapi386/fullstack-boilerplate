import React from "react"
import { Link } from "./Link"
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SimpleGrid,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/core/dist"
import { useMe, useUser } from "../providers/MeProvider"
import { useLogout } from "../../lib/hooks/useLogout"

import { useLocalStorage } from "@noquarter/hooks"
import {
  FaHome,
  FaUserCircle,
  FiCalendar,
  IoMdLogOut,
  WiMoonAltWaningCrescent2,
} from "react-icons/all"
import { useLocation } from "@reach/router"

const LeftTitle = () => {
  return (
    <Link
      _hover={{ outline: "none", color: "blue.500" }}
      _focus={{ outline: "none" }}
      to="/"
    >
      <Box m={2}>
        <Heading as="i">Fancy Co.</Heading>
      </Box>
    </Link>
  )
}
const UserProfileMenuItem = () => {
  const me = useMe()
  const avatarUrl = me.avatarUrl ? me.avatarUrl : ""
  return (
    <Box m="1em">
      <Link
        to={"/u/" + me.id}
        w={"100%"}
        _hover={{ outline: "none", color: "blue.500" }}
        _focus={{ outline: "none" }}
      >
        <SimpleGrid columns={2}>
          <Avatar
            size="lg"
            name={me.firstName + " " + me.lastName}
            src={avatarUrl}
          />
          <Box>
            <Flex>
              <Text fontSize="lg">
                {me.firstName} {me.lastName}
              </Text>
            </Flex>
            <Flex fontSize="sm">See your profile</Flex>
          </Box>
        </SimpleGrid>
      </Link>
    </Box>
  )
}

const DropDownMenu = ({ menubuttoncolor }: { menubuttoncolor: string }) => {
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
  const colorAction = colorMode === "light" ? "Light" : "Dark"
  const rotation = colorMode === "light" ? "" : "rotate(180deg)"

  const ProfilePictureOrGenericAvatar = () => {
    const me = useMe()
    if (me.avatarUrl) {
      return <Avatar src={me.avatarUrl} size="sm" showBorder={true} />
    }
    return <Box as={FaUserCircle} size="32px" color={menubuttoncolor} />
  }

  return (
    <Menu>
      <MenuButton p="2" _hover={{ color: "blue.500" }}>
        <ProfilePictureOrGenericAvatar />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <UserProfileMenuItem />
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={toggleColor}>
          <Box transform={rotation} as={WiMoonAltWaningCrescent2} size="32px" />
          <Box ml={1}>{colorAction}</Box>
          <Flex w="70%" direction="row-reverse">
            <Switch
              onChange={toggleColor}
              isChecked={colorMode === "dark"}
              size="lg"
            />
          </Flex>
        </MenuItem>
        <MenuItem onClick={logout}>
          <Box as={IoMdLogOut} size="32px" />
          <Box ml={1}>Logout</Box>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const RightNav = () => {
  // determine which icon should be the active color
  // by looking at the url path
  const location = useLocation()
  const pathname = location.pathname
  const isHosting = pathname.includes("hosting")
  const isProfile = pathname.includes("/u/")
  const isDash = isProfile !== isHosting
  const user = useUser()

  return user ? (
    <Flex justifyContent={"flex-end"} m={1}>
      <Link to="/" p="2" _hover={{ color: "blue.500" }}>
        <Box as={FaHome} size="32px" color={isDash ? "" : "blue.500"} />
      </Link>
      <Link to="/hosting" p="2" _hover={{ color: "blue.500" }}>
        <Box as={FiCalendar} size="32px" color={isHosting ? "blue.500" : ""} />
      </Link>
      <DropDownMenu menubuttoncolor={isProfile ? "blue.500" : ""} />
    </Flex>
  ) : (
    <Flex justifyContent={"flex-end"} m={1}>
      <Link to="/login" p="2" _hover={{ color: "blue.500" }}>
        <Icon name="unlock" size="32px" /> Login
      </Link>
    </Flex>
  )
}

export const NavBar = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} m="1">
      <LeftTitle />
      <RightNav />
    </Grid>
  )
}
