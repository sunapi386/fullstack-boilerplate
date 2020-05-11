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
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/core/dist"
import { MeFragment } from "../../lib/graphql"
import { GoVerified } from "react-icons/all"

// https://github.com/bl00mber/react-phone-input-2
// https://gitlab.com/catamphetamine/react-phone-number-input

// make a phone number validator
// and have twilo text the number to confirm
// also email validator

export const PhoneVerifier = ({ user }: { user: MeFragment }) => {
  if (!user.phoneValidated) {
    return (
      <Box>
        Your phone {user.phone} is already verified <Box as={GoVerified} />
        <FormLabel htmlFor="phone">Phone Number</FormLabel>
        <Editable defaultValue="408 555 0428">
          <EditablePreview />
          <EditableInput id="phone" />
        </Editable>
      </Box>
    )
  }

  return (
    <Box mb="4px">
      <FormLabel htmlFor="phone">Phone Number</FormLabel>
      <Box fontSize="sm">SMS text message will be sent</Box>
      <Input id="phone" placeholder="Please enter phone number" />
      <Flex m="4px" justify="center">
        <Button>
          <Box as={GoVerified} /> Verify Phone
        </Button>
      </Flex>
    </Box>
  )
}
export const EmailVerifier = ({ user }: { user: MeFragment }) => {
  return (
    <Box>
      <Box>Your email is {user.emailValidated ? "" : "not"} validated</Box>
      <Editable defaultValue={user.email}>
        <EditablePreview />
        <EditableInput id="phone" />
      </Editable>
    </Box>
  )
}
export const UserValidator = ({ user }: { user: MeFragment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <Flex m={1} justifyContent="center" justify="center">
      <Button
        ref={btnRef}
        leftIcon={GoVerified}
        variant="outline"
        onClick={onOpen}
      >
        Verify Account Identity
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Verify Account Identity
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                You must verify your identity in order to post listings.
              </Box>
              <PhoneVerifier user={user} />
              <EmailVerifier user={user} />
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="blue">Verify</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}
