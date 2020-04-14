import React from "react"
import { Link } from "./Link"
import {
  Avatar,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
} from "@chakra-ui/core/dist"
import { useMe } from "./providers/MeProvider"

export const NavBar = () => {
  const me = useMe()
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      {/*<Menu>*/}
      {/*  <MenuButton as={Button} rightIcon="chevron-down">*/}
      {/*    Actions*/}
      {/*  </MenuButton>*/}
      {/*  <MenuList>*/}
      {/*    <MenuItem>Download</MenuItem>*/}
      {/*    <MenuItem>Create a Copy</MenuItem>*/}
      {/*    <MenuItem>Mark as Draft</MenuItem>*/}
      {/*    <MenuItem>Delete</MenuItem>*/}
      {/*    <MenuItem as="a" href="#">*/}
      {/*      Attend a Workshop*/}
      {/*    </MenuItem>*/}
      {/*  </MenuList>*/}
      {/*</Menu>*/}
      <Link to="/settings">
        <Avatar name={me.firstName + " " + me.lastName} />
      </Link>
    </nav>
  )
}
