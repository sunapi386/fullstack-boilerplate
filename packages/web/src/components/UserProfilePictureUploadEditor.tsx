import React, { useState } from "react"
import { MeFragment } from "../lib/graphql"
import AvatarEditor from "react-avatar-editor"
import { Button, Checkbox, Slider } from "@chakra-ui/core"
import {
  Box,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  useColorMode,
} from "@chakra-ui/core/dist"
import { MdGraphicEq } from "react-icons/all"

export const UserProfilePictureUploadEditor = ({
  user,
}: {
  user: MeFragment
}) => {
  const imageUrl: string = user.avatarUrl ? user.avatarUrl : ""
  const { colorMode } = useColorMode()
  const white = [255, 255, 255, 0.8] // RGBA
  const black = [0, 0, 0, 0.6]
  const color = colorMode === "dark" ? black : white

  // https://github.com/react-dropzone/react-dropzone
  // https://github.com/mosch/react-avatar-editor

  // make another component just for a popup modal viewer
  // using react-dropzone
  const [allowZoomOut, setCheckedZoom] = useState<boolean>(false)
  const [zoom, setZoom] = useState<number>(1)
  const [rotate, setRotate] = useState<number>(0)

  const onUploadNewPhoto = () => {
    console.log("clicked uploadNewPhoto")
  }
  const onClickSave = () => {
    console.log("clicked saved")
  }
  const onClickCancel = () => {
    console.log("clicked cancel")
  }

  const size = 250
  return (
    <Stack>
      <AvatarEditor
        image={imageUrl}
        width={size}
        height={size}
        border={50}
        color={color}
        scale={zoom}
        rotate={rotate}
        borderRadius={size}
      />

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

      <Button onClick={onUploadNewPhoto}>Upload New Photo</Button>
      <Button onClick={onClickSave}>Save</Button>
      <Button onClick={onClickCancel}>Cancel</Button>
    </Stack>
  )
}
