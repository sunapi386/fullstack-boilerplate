import React, { FC } from "react"
import {
  Box,
  Button,
  Flex,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Text,
} from "@chakra-ui/core/dist"
import { RouteComponentProps } from "@reach/router"
import { MdSearch } from "react-icons/all"
import DateRangePicker from "react-daterange-picker"
import "react-daterange-picker/dist/css/react-calendar.css" // For some basic styling. (OPTIONAL)
import { Moment } from "moment"

export const ListingsSearchBox: FC<RouteComponentProps> = () => {
  // const [date, setDate] = React.useState({start: null, end: null})
  const handleDateSelected = ({
    start,
    end,
  }: {
    start: Moment
    end: Moment
  }) => {
    console.log(start, end)
    // setDate({ start: start, end: end })
  }

  return (
    <Flex w="100%" p={8}>
      <SimpleGrid columns={4} spacing={2} w="99%">
        <Input placeholder="City address" />

        {/*Date picker*/}
        <Box>
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
                Pick Date
              </Flex>
            </PopoverTrigger>
            <PopoverContent zIndex={4}>
              <PopoverCloseButton />
              <PopoverHeader>Select Dates</PopoverHeader>
              <PopoverBody>
                <DateRangePicker
                  numberOfCalendars={2}
                  selectionType="range"
                  minimumDate={new Date()}
                  onSelect={handleDateSelected}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>

        <Box>
          <Flex
            borderRadius={4}
            border="1px"
            borderColor="gray.500"
            p={2}
            justify="center"
          >
            Guests
          </Flex>
        </Box>

        <Button>
          <Box as={MdSearch} size="28px">
            <Text p={2}>Search</Text>
          </Box>
          <Text>Search</Text>
        </Button>
      </SimpleGrid>
    </Flex>
  )
}
