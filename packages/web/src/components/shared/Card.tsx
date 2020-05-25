import React from "react"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import { UserProfilePictureUploadEditor } from "../user/UserProfilePictureUploadEditor"

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
  return (
    <Box m="1em" {...params}>
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

  // alertdialog
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>

  const { loading, data } = result
  if (loading) {
    return <LoadSpinner />
  }
  const user = data.user
  const fullName = `${user.firstName} ${user.lastName}`
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
                console.log(
                  "UserProfileCard Avatar click, open userprofilepictureuploadeditor",
                )
                setIsOpen(true)
              }}
              name={fullName}
              src={data.user.avatarUrl}
              size="xl"
              mb="4"
            />

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Edit Photo
                </AlertDialogHeader>

                <AlertDialogBody>
                  <UserProfilePictureUploadEditor user={user} />
                </AlertDialogBody>
              </AlertDialogContent>
            </AlertDialog>
          </Flex>
          <PeopleSmallBox title={fullName} text={data.user.email} />
          {Phone}
        </SimpleGrid>
      </Card>
    </Box>
  )
}
