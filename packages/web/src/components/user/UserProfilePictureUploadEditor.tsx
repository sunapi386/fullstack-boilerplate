import React, { useRef, useState } from "react"
import { MeFragment, useUpdateUserAvatarMutation } from "../../lib/graphql"
import AvatarEditor from "react-avatar-editor"
import { Avatar, Button, Checkbox, Slider } from "@chakra-ui/core"
import {
  Box,
  Flex,
  Heading,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  useColorMode,
} from "@chakra-ui/core/dist"
import { MdGraphicEq } from "react-icons/all"
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
  const { colorMode } = useColorMode()
  const white = [255, 255, 255, 0.8] // RGBA
  const black = [0, 0, 0, 0.6]
  const color = colorMode === "dark" ? black : white

  // https://github.com/react-dropzone/react-dropzone
  // https://github.com/mosch/react-avatar-editor

  // make another component just for a popup modal viewer
  const [allowZoomOut, setCheckedZoom] = useState<boolean>(false)
  const [zoom, setZoom] = useState<number>(1)
  const [rotate, setRotate] = useState<number>(0)
  const imageRef = useRef<AvatarEditor>(null)
  const [updateUserAvatar] = useUpdateUserAvatarMutation()

  const onUploadNewPhoto = () => {
    console.log("clicked uploadNewPhoto")
  }

  const handleUpdateImage = async (avatarKey: string) => {
    return updateUserAvatar({
      variables: { data: { avatarKey } },
    })
  }

  const onSave = () => {
    if (!imageRef || !imageRef.current) {
      console.log("Save failed, no imageRef")
      return
    }
    const canvas = imageRef.current.getImage()

    // Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be
    // exported.
    // const medQuality = canvas.toDataURL("image/jpeg", 0.5)

    // upload image
    console.log("clicked saved", canvas)
    // console.log("image", medQuality)
  }
  const onClickCancel = () => {
    console.log("clicked cancel")
  }

  const size = 250

  if (!user.avatarUrl) {
    return (
      <Stack>
        <Flex justify="center" onClick={onUploadNewPhoto}>
          <ImageUploader
            onSubmit={handleUpdateImage}
            path={`user/avatar/${user.id}`}
          >
            <Avatar
              size="xl"
              name={user.firstName + " " + user.lastName}
              src={user.avatarUrl || undefined}
              mb="4"
            />
          </ImageUploader>
        </Flex>
      </Stack>
    )
  }
  const imageUrl: string = user.avatarUrl

  return (
    <Stack>
      <Flex align="center" justify="center">
        <Heading fontSize="2xl"> Edit Photo</Heading>
      </Flex>
      <Flex align="center" justify="center">
        <AvatarEditor
          ref={imageRef}
          image={imageUrl}
          width={size}
          height={size}
          border={50}
          color={color}
          scale={zoom}
          rotate={rotate}
          borderRadius={size}
        />
      </Flex>

      <Box>Zoom</Box>
      <Slider
        defaultValue={zoom}
        min={allowZoomOut ? 0.5 : 1}
        max={2}
        step={0.01}
        onChange={value => {
          setZoom(value)
        }}
      >
        <SliderTrack bg="blue.100" />
        <SliderFilledTrack bg="blue.500" />
        <SliderThumb size={6}>
          <Box color="blue.500" as={MdGraphicEq} />
        </SliderThumb>
      </Slider>

      <Checkbox
        isChecked={allowZoomOut}
        onChange={() => {
          setCheckedZoom(!allowZoomOut)
        }}
      >
        Allow zoom out
      </Checkbox>

      <Box>Rotate</Box>
      <Slider
        defaultValue={rotate}
        min={-180}
        max={180}
        onChange={value => {
          setRotate(value)
        }}
      >
        <SliderTrack bg="blue.100" />
        <SliderFilledTrack bg="blue.500" />
        <SliderThumb size={6}>
          <Box color="blue.500" as={MdGraphicEq} />
        </SliderThumb>
      </Slider>

      <Button isDisabled={true} bg="blue.500" type="submit" onClick={onSave}>
        Save (not available, work in progress)
      </Button>
      <Button isDisabled={true} variant="outline" onClick={onClickCancel}>
        Cancel
      </Button>
    </Stack>
  )
}
