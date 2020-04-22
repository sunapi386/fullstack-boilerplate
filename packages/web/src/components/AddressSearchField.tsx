import React from "react"
import { useColorMode } from "@chakra-ui/core/dist"

// rsuite stuff
import { AutoComplete } from "rsuite"

// according to https://github.com/rsuite/rsuite#usage
// 1. I should import the styles
import 'rsuite/lib/styles/index.less'; // or 'rsuite/dist/styles/rsuite-default.css'

// 2. tried this as it seems more specific to AutoComplete, seems to have no no effect either
import "rsuite/lib/AutoComplete/styles"

// 3. resorting to try this, but it overwrites all the styles from chakra-ui
import 'rsuite/dist/styles/rsuite-default.css'

// 4. also I needed to do dark theme too
interface AddressSearchFieldProps {
  data: string[]
}

export const AddressSearchField = ({ data, ...props }: AddressSearchFieldProps) => {
  const {colorMode} = useColorMode() // colorMode === "light" ? lightTheme : darkTheme
  return <AutoComplete
    // not needed it seems
    // style={}
    data={data}
    {...props}
  />
}
