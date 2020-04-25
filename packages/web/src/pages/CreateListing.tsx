import React, { FC } from "react"
import { Box, Button, Flex, Heading } from "@chakra-ui/core/dist"
import { navigate, RouteComponentProps } from "@reach/router"
import { Page } from "../components/Page"
import { Form } from "../components/Form"
import { Input } from "../components/Input"
import { FormError } from "../components/FormError"
import { useForm } from "../lib/hooks/useForm"
import { CreateListingInput } from "../lib/graphql"
import * as Yup from "yup"
import { gql, useMutation } from "@apollo/client"

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
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
})

export const CreateListing: FC<RouteComponentProps> = () => {
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
        <Box w={["100%", 900]}>
          <Form onSubmit={onSubmit} {...form}>
            <Input
              name="title"
              label="Title"
              placeholder="Great Room With View"
            />
            <Input
              name="description"
              label="Description"
              placeholder="Near the park and subway"
            />
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
