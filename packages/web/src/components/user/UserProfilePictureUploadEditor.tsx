import React from "react"
import { MeFragment, useUpdateUserAvatarMutation } from "../../lib/graphql"
import { Avatar, Button } from "@chakra-ui/core"
import { Flex, Stack } from "@chakra-ui/core/dist"
import { gql } from "@apollo/client"
import { ImageUploader } from "../ImageUploader"

export const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($data: UpdateUserInput!) {
    updateMe(data: $data) {
      id
      avatarUrl
    }
  }
`

export const UserProfilePictureUploadEditor = ({
  user,
}: {
  user: MeFragment
}) => {
  // make another component just for a popup modal viewer
  const [updateUserAvatar] = useUpdateUserAvatarMutation()

  const handleUpdateImage = async (avatarKey: string) => {
    return await updateUserAvatar({
      variables: { data: { avatarKey } },
    })
  }
  const onDeletePhoto = async () => {
    return updateUserAvatar({
      variables: { data: { avatarKey: "" } },
    })
  }

  return (
    <Stack>
      <Flex justify="center">
        <ImageUploader
          onSubmit={handleUpdateImage}
          path={`user/avatar/${user.id}`}
        >
          <Avatar
            size="xl"
            name={user.firstName + " " + user.lastName}
            src={user.avatarUrl || ""}
            mb="4"
          />
        </ImageUploader>
      </Flex>
      {user.avatarUrl ? (
        <Button variantColor="red" onClick={onDeletePhoto}>
          Delete Photo!
        </Button>
      ) : (
        ""
      )}
    </Stack>
  )
}
