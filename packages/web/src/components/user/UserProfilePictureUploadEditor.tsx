import React, { useRef, useState } from "react"
import { MeFragment } from "../../lib/graphql"
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
import {
  ApolloQueryResult,
  FetchResult,
  gql,
  MutationFunctionOptions,
  OperationVariables,
  useMutation,
} from "@apollo/client"
import useImperativeQuery from "../shared/useImperativeQuery"
import { REQUEST_UPLOAD_URL } from "../../pages/CreateListing"

export const UPDATE_USER_PHOTO = gql`
  mutation UpdateUserPhoto($avatarUrl: String!) {
    updateMe(data: { avatarUrl: $avatarUrl }) {
      avatarUrl
    }
  }
`

function getOnDrop(
  userId: string,
  getSignedUrl: (
    variables?: OperationVariables,
  ) => Promise<ApolloQueryResult<any>>,
  uploadPhoto: (options?: MutationFunctionOptions) => Promise<FetchResult<any>>,
) {
  return async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    console.log("first new photo", acceptedFiles)
    console.log(acceptedFiles)
    console.log("process (uploading)", file)
    const fileKey = userId + file.lastModified + file.name
    const { data } = await getSignedUrl({
      filename: fileKey,
      contentType: file.type,
    })
    console.log("getSignedUrl data", data)
    const destination = data.generateListingAssetUploadUrl
    console.log("destination", destination)

    // https://pqina.nl/filepond/docs/patterns/api/server/#advanced

    // fieldName is the name of the input field
    // file is the actual file object to send
    const request = new XMLHttpRequest()
    request.open("PUT", destination)
    request.setRequestHeader("Content-Type", file.type)
    request.setRequestHeader(
      "Content-Disposition",
      `inline; filename=${file.name}`,
    )
    request.upload.onprogress = e => {
      // progress(e.lengthComputable, e.loaded, e.total)
      console.log(e.lengthComputable, e.loaded, e.total)
    }

    request.onload = async () => {
      if (request.status >= 200 && request.status < 300) {
        // the load method accepts either a string (id) or an object
        console.log("avatarUrl key", fileKey)
        await uploadPhoto({
          variables: { avatarUrl: fileKey },
        }).then(() => {
          window.location.reload()
        })
      } else {
        // Can call the error method if something is wrong, should exit after
        console.log("we failed")
      }
    }
    request.send(file)
  }
}

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
  const getSignedUrl = useImperativeQuery(REQUEST_UPLOAD_URL)
  const [uploadPhoto] = useMutation(UPDATE_USER_PHOTO)

  const onUploadNewPhoto = () => {
    console.log("clicked uploadNewPhoto")
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
          <Dropzone
            multiple={false}
            onDrop={getOnDrop(user.id, getSignedUrl, uploadPhoto)}
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
                  Drop profile photo here or select one
                </Flex>
              </Flex>
            )}
          </Dropzone>
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

      <Flex justify="center" onClick={onUploadNewPhoto}>
        <Dropzone
          multiple={false}
          onDrop={getOnDrop(user.id, getSignedUrl, uploadPhoto)}
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
