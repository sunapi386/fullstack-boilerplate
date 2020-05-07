import React, { useRef, useState } from "react"
import { MeFragment } from "../lib/graphql"
import AvatarEditor from "react-avatar-editor"
import { Button, Checkbox, Slider } from "@chakra-ui/core"
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
import Dropzone from "react-dropzone"

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
  const [allowZoomOut, setCheckedZoom] = useState<boolean>(false)
  const [zoom, setZoom] = useState<number>(1)
  const [rotate, setRotate] = useState<number>(0)
  const imageRef = useRef<AvatarEditor>(null)

  const onUploadNewPhoto = () => {
    console.log("clicked uploadNewPhoto")
  }

  const onSave = () => {
    if (!imageRef || !imageRef.current) {
      console.log("Save failed, no imageRef")
      return
    }
    const canvas = imageRef.current.getImage()
    const medQuality = canvas.toDataURL("image/jpeg", 0.5)
    // upload image
    console.log("clicked saved", canvas)
    console.log("image", medQuality)
  }
  const onClickCancel = () => {
    console.log("clicked cancel")
  }

  const size = 250
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

      <Button bg="blue.500" type="submit" onClick={onSave}>
        Save
      </Button>
      <Button variant="outline" onClick={onClickCancel}>
        Cancel
      </Button>

      <Flex justify="center" onClick={onUploadNewPhoto}>
        <Dropzone
          multiple={false}
          onDrop={acceptedFiles => console.log(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <Flex {...getRootProps()}>
              <input {...getInputProps()} />
              <Flex
                as={Button}
                height="120px"
                textAlign="justify"
                justify="center"
              >
                Drag 'n' drop a new photo here, or click to select
              </Flex>
            </Flex>
          )}
        </Dropzone>
      </Flex>
    </Stack>
  )
}
