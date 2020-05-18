import React, { FC } from "react"
import { Box, Button, Flex, Heading } from "@chakra-ui/core/dist"
import { navigate, RouteComponentProps } from "@reach/router"
import { Page } from "../components/shared/Page"
import { Form } from "../components/shared/Form"
import { Input } from "../components/shared/Input"
import { FormError } from "../components/shared/FormError"
import { useForm } from "../lib/hooks/useForm"
import { CreateListingInput } from "../lib/graphql"
import * as Yup from "yup"
import { gql, useMutation } from "@apollo/client"
import { Upload } from "../components/shared/Upload"
import useImperativeQuery from "../components/shared/useImperativeQuery"
import { useMe } from "../components/providers/MeProvider"
import { Textarea } from "../components/shared/Textarea"

// A page to create new listing

export const CREATE_LISTING = gql`
  mutation AddNewListing($data: CreateListingInput!) {
    createListing(data: $data) {
      createdAt
      id
    }
  }
`

const ListingSchema = Yup.object().shape<CreateListingInput>({
  imageUrl: Yup.string().required("Required"),
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  price: Yup.number()
    .required("Required")
    .min(0),
  beds: Yup.number()
    .notRequired()
    .min(0),
  baths: Yup.number()
    .notRequired()
    .min(0),
})
export const REQUEST_UPLOAD_URL = gql`
  query RequestUploadUrl($filename: String!, $contentType: String!) {
    generateListingAssetUploadUrl(
      filename: $filename
      contentType: $contentType
    )
  }
`

export const CreateListing: FC<RouteComponentProps> = () => {
  const me = useMe()
  const getSignedUrl = useImperativeQuery(REQUEST_UPLOAD_URL)

  const [createListing] = useMutation(CREATE_LISTING)
  const form = useForm<CreateListingInput>({ validationSchema: ListingSchema })

  const onSubmit = async (newListingData: CreateListingInput) => {
    const res = await createListing({
      variables: { data: newListingData },
    })
    form.handler(res, {
      onSuccess: data => {
        navigate("/listing/" + data.createListing.id, { replace: true })
      },
    })
  }

  // const processUpload = async()

  // const fileItems: Asset[] = []
  const { setValue } = form
  return (
    <Page>
      <Flex
        h="100vh"
        w="100%"
        align="center"
        justifyContent="flex-start"
        p={{ base: 10, lg: "5%" }}
        direction="column"
      >
        <Heading pb={10}>Create Listing</Heading>
        <Box w={["100%", 400]}>
          <Form onSubmit={onSubmit} {...form}>
            <Box>
              <Upload
                name={"imageUrl"}
                label={"Photos"}
                maxFiles={1}
                allowMultiple={false}
                acceptedFileTypes={["image/*"]}
                /** A file has been added or removed, receives a list of file items */
                required={true}
                server={{
                  revert: (
                    uniqueFieldId: string,
                    load: () => void,
                    error: (errorText: string) => void,
                  ) => {
                    console.log("revert", uniqueFieldId)
                    if (error) {
                      // todo: add revert feature
                      console.log("revert error", error)
                    }
                    load()
                  },
                  process: async (
                    fieldName,
                    file,
                    metadata,
                    load,
                    error,
                    progress,
                    abort,
                  ) => {
                    console.log("process (uploading)", file)
                    const fileKey = me.id + file.lastModified + file.name
                    const { data } = await getSignedUrl({
                      filename: fileKey,
                      contentType: file.type,
                    })
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
                      progress(e.lengthComputable, e.loaded, e.total)
                    }

                    request.onload = () => {
                      if (request.status >= 200 && request.status < 300) {
                        // the load method accepts either a string (id) or an object
                        console.log("imageUrl key", fileKey)
                        load(fileKey)
                        setValue("imageUrl", fileKey)
                      } else {
                        // Can call the error method if something is wrong, should exit after
                        console.log("error upload failed")
                        error("up failed")
                      }
                    }
                    request.send(file)

                    // Should expose an abort method so the request can be cancelled
                    return {
                      abort: () => {
                        // This function is entered if the user has tapped the cancel button
                        // Let FilePond know the request has been cancelled
                        request.abort()
                        abort()
                      },
                    }
                  },
                  load: (source, load) => {
                    // simulates loading a file from the server
                    console.log("load", source, load)
                  },
                }}
              />
            </Box>

            <Input
              name="title"
              label="Title"
              placeholder="Great Room With View"
            />
            <Textarea
              name="description"
              label="Description"
              placeholder="Near the park and subway"
            />

            <Input name="price" label="Daily Price" placeholder="$" />

            <Input name="beds" label="Bedrooms" placeholder="1" />

            <Input name="baths" label="Bathrooms" placeholder="1" />

            <FormError display="flex" justifyContent="flex-end" />
            <Button
              variantColor="blue"
              type="submit"
              isFullWidth
              loadingText="loading"
              isLoading={form.formState.isSubmitting}
            >
              Create Listing
            </Button>
          </Form>
        </Box>
      </Flex>
    </Page>
  )
}
