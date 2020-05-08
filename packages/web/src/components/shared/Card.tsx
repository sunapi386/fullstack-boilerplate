import React, { FC } from "react"
import {
  Avatar,
  Box,
  Flex,
  SimpleGrid,
  useColorMode,
} from "@chakra-ui/core/dist"
import { useQuery } from "@apollo/client"
import { LoadSpinner } from "./LoadSpinner"
import { PUBLIC_USER } from "../user/UserDetailsComponent"

export const Card: FC = ({ children }) => {
  return (
    <Box p={5} shadow="sm" borderWidth="1px">
      {children}
    </Box>
  )
}

const PeopleSmallBox = ({
  title,
  text,
  ...params
}: {
  title: string
  text: string
}) => {
  // add a custom lighter grey color here
  const { colorMode } = useColorMode()
  const color = { light: "black", dark: "white" }

  return (
    <Box
      borderColor={color[colorMode]}
      m="1em"
      color={color[colorMode]}
      {...params}
    >
      <Box textAlign="center" overflow="auto" fontWeight="semibold">
        {title}
      </Box>
      {/*<Divider orientation="horizontal"/>*/}
      <Box textAlign="center" overflow="auto" fontSize="sm">
        {text}
      </Box>
    </Box>
  )
}

export const UserProfileCard = ({ userId }: { userId: string }) => {
  const result = useQuery(PUBLIC_USER, { variables: { id: userId } })
  const { loading, data } = result
  if (loading) {
    return <LoadSpinner />
  }
  const fullName = `${data.user.firstName} ${data.user.lastName}`
  return (
    <Box m={4} justifyContent="center">
      <Card>
        <SimpleGrid minChildWidth="100px" spacing="1em" m="1em" w="90%">
          <Flex align="center" justify="center">
            <Avatar
              onClick={() => {
                console.log("click")
              }}
              name={fullName}
              src={data.user.avatarUrl}
              size="xl"
            />
          </Flex>

          <PeopleSmallBox title={"Name"} text={fullName} />
          <PeopleSmallBox title={"Email"} text={data.user.email} />
          {/*<PeopleSmallBox title={"Phone"} text={data.user.phone} />*/}
        </SimpleGrid>
      </Card>
    </Box>
  )
}
