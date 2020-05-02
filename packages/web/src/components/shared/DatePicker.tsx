import React from "react"
import {
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/core/dist"
import DateRangePicker from "react-daterange-picker"
import "react-daterange-picker/dist/css/react-calendar.css" // For some basic styling. (OPTIONAL)

interface DatePickerProps {
  handleDateSelection?: (values: any) => Promise<any> | any
}

export const DatePickerPopover = ({ handleDateSelection }: DatePickerProps) => {
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
            onSelect={handleDateSelection}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
