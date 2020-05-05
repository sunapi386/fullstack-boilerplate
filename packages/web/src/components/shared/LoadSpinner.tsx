import React from "react"
import { Spinner, Flex } from "@chakra-ui/core"

export const LoadSpinner: React.FC = ({ ...props }) => {
  return (
    <Flex align="center" justify="center">
      <Spinner
        h="15vh"
        w="15vh"
        m="2em"
        thickness="4px"
        speed="0.75s"
        emptyColor="gray.200"
        color="blue.500"
        {...props}
      />
    </Flex>
  )
}
