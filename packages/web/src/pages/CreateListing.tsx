import React, { FC } from "react"
import { Box, Button, Flex, Heading } from "@chakra-ui/core/dist"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/Page"
import { Form } from "../components/Form"
import { Input } from "../components/Input"
import { FormError } from "../components/FormError"
import { useForm } from "../lib/hooks/useForm"
import { CreateListingInput } from "@fullstack-boilerplate/api/src/modules/listing/inputs/createlisting.input"
import * as Yup from "yup"

// A page to create new listing
//
// export const LISTING = gql`
//   mutation AddNewLisiting($data: ListingInput!) {
//     register(data: $data) {
//       user {
//         ...Me
//       }
//       token
//     }
//   }
//   ${MeFragmentDoc}
// `

const ListingSchema = Yup.object().shape<CreateListingInput>({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
})

export const CreateListing: FC<RouteComponentProps> = () => {
  const onSubmit = async (values: CreateListingInput) => {
    console.log(values)
    // const res = await register({
    //   variables: { data: values },
    // })
    // form.handler(res, {
    //   onSuccess: data => {
    //     localStorage.setItem("token", data.register.token)
    //     client.writeQuery<MeQuery>({
    //       query: MeDocument,
    //       data: { me: data.register.user },
    //     })
    //   },
    // })
  }

  const form = useForm<CreateListingInput>({ validationSchema: ListingSchema })

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
