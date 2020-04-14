import React from "react"
import { Flex } from "@chakra-ui/core"
import { NavBar } from "./NavBar"

export const Page: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <Flex h="100vh" w="100vw" align="center" justify="center">
        {children}
      </Flex>
    </>
  )
}
