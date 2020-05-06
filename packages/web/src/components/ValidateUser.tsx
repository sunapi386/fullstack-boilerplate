import React from "react"

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/core/dist"
import { MeFragment } from "../lib/graphql"

// https://github.com/bl00mber/react-phone-input-2
// https://gitlab.com/catamphetamine/react-phone-number-input

// make a phone number validator
// and have twilo text the number to confirm
// also email validator

export const ValidateUser = ({ user }: { user: MeFragment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <Box>
      <Button ref={btnRef} leftIcon="add" variantColor="teal" onClick={onOpen}>
        Validate Me
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new account
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input id="username" placeholder="Please enter user name" />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="blue">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
