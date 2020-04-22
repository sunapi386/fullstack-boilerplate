import React from "react"
import {
  Box,
  Divider,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/core/dist"

interface GuestPickerProps {}

interface PickingRowProps {
  title: string
  value?: number
  onChange?: (values: any) => Promise<any> | any
}

export const PickingRow = ({ title, value, onChange }: PickingRowProps) => {
  return (
    <SimpleGrid columns={2} w="100%">
      <Flex w="85%">
        <Text textAlign="center">{title}</Text>
      </Flex>
      <Flex>
        <NumberInput value={value} size="sm" min={0} defaultValue="0">
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
    </SimpleGrid>
  )
}

export const GuestPickerPopover = ({ ...props }: GuestPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Flex
          p={2}
          border="1px"
          borderColor="gray.500"
          borderRadius={4}
          align="center"
          justify="center"
        >
          Guests
        </Flex>
      </PopoverTrigger>
      <PopoverContent zIndex={4}>
        <PopoverCloseButton />
        <PopoverHeader>Select Guests</PopoverHeader>
        <PopoverBody>
          <Box>
            <Stack>
              <PickingRow title="Adults (13+)" />
              <Divider />
              <PickingRow title="Children (2-12)" />
              <Divider />
              <PickingRow title="Infants (Under 2)" />
            </Stack>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
