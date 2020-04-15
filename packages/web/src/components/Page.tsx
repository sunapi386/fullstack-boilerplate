import React from "react"
import { Flex } from "@chakra-ui/core"
import { NavBar } from "./NavBar"

export const Page: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <Flex h="93vh" w="100vw" align="top" justify="center">
        {children}
      </Flex>
    </>
  )
}
