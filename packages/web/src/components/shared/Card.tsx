import React from "react"
import {
  Avatar,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  useColorMode,
} from "@chakra-ui/core/dist"
import { useQuery } from "@apollo/client"
import { LoadSpinner } from "./LoadSpinner"
import { PUBLIC_USER } from "../user/UserDetailsComponent"

interface CardProps {
  title: string
}
export const Card: React.FC<CardProps> = props => {
  return (
    <Box p={5} shadow="sm" mb="1em" borderRadius="4px" borderWidth="1px">
      <Box>
        <Heading fontSize="lg">{props.title}</Heading>
      </Box>
      {props.children}
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
  const Phone =
    data.user.phone !== undefined ? (
      <PeopleSmallBox title={"Phone"} text={data.user.phone} />
    ) : (
      ""
    )
  return (
    <Box m={4} justifyContent="center">
      <Card title="">
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
          <PeopleSmallBox title={fullName} text={data.user.email} />
          {Phone}
        </SimpleGrid>
      </Card>
    </Box>
  )
}
