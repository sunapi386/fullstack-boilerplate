import gql from "graphql-tag.macro"
import * as ApolloReactCommon from "@apollo/client"
import * as ApolloReactHooks from "@apollo/client"
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type AuthResponse = {
  __typename?: "AuthResponse"
  user: User
  token: Scalars["String"]
}

export type BaseEntity = {
  __typename?: "BaseEntity"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Complaint = {
  __typename?: "Complaint"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  author: User
  plate: Plate
  description: Scalars["String"]
  title: Scalars["String"]
}

export type CreateComplaintInput = {
  description?: Maybe<Scalars["String"]>
  title: Scalars["String"]
  plate_serial: Scalars["String"]
  state: Scalars["String"]
}

export type CreateListingInput = {
  title: Scalars["String"]
  description: Scalars["String"]
  imageUrl?: Maybe<Scalars["String"]>
  imageAlt?: Maybe<Scalars["String"]>
  price: Scalars["Int"]
  beds?: Maybe<Scalars["Int"]>
  baths?: Maybe<Scalars["Int"]>
}

export type Fileurl = {
  __typename?: "Fileurl"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  author: User
  description: Scalars["String"]
  url: Scalars["String"]
}

export type Listing = {
  __typename?: "Listing"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  description: Scalars["String"]
  title: Scalars["String"]
  imageUrl?: Maybe<Scalars["String"]>
  imageAlt?: Maybe<Scalars["String"]>
  beds?: Maybe<Scalars["Int"]>
  baths?: Maybe<Scalars["Int"]>
  price: Scalars["Int"]
  reviews?: Maybe<Scalars["Int"]>
  ratings?: Maybe<Scalars["Int"]>
  author: User
}

export type LoginInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  createComplaint?: Maybe<Complaint>
  deleteComplaintNumber: Scalars["Boolean"]
  createListing?: Maybe<Listing>
  deleteListingNumber: Scalars["Boolean"]
  deletePlateNumber: Scalars["Boolean"]
  updateMe?: Maybe<User>
  login: AuthResponse
  register: AuthResponse
  logout?: Maybe<Scalars["Boolean"]>
  forgotPassword: Scalars["Boolean"]
  resetPassword: Scalars["Boolean"]
}

export type MutationCreateComplaintArgs = {
  data: CreateComplaintInput
}

export type MutationDeleteComplaintNumberArgs = {
  id: Scalars["String"]
}

export type MutationCreateListingArgs = {
  data: CreateListingInput
}

export type MutationDeleteListingNumberArgs = {
  id: Scalars["String"]
}

export type MutationDeletePlateNumberArgs = {
  id: Scalars["String"]
}

export type MutationUpdateMeArgs = {
  data: UpdateUserInput
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationRegisterArgs = {
  data: RegisterInput
}

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]
}

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput
}

export type Plate = {
  __typename?: "Plate"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  plate_serial: Scalars["String"]
  state: Scalars["String"]
  complaints: Array<Complaint>
}

export type PublicUserResponse = {
  __typename?: "PublicUserResponse"
  email: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  avatarUrl?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
}

export type Query = {
  __typename?: "Query"
  getComplaints: Array<Complaint>
  findComplaintsFor: Array<Complaint>
  listings: Array<Listing>
  findListing: Listing
  generateListingAssetUploadUrl: Scalars["String"]
  signedDownloadUrl: Scalars["String"]
  getPlates: Array<Plate>
  findByPlateSerialAndState: Plate
  user?: Maybe<PublicUserResponse>
  me?: Maybe<User>
}

export type QueryFindComplaintsForArgs = {
  plate_serial: Scalars["String"]
  state: Scalars["String"]
}

export type QueryFindListingArgs = {
  id: Scalars["String"]
}

export type QueryGenerateListingAssetUploadUrlArgs = {
  contentType: Scalars["String"]
  filename: Scalars["String"]
}

export type QuerySignedDownloadUrlArgs = {
  filename: Scalars["String"]
}

export type QueryFindByPlateSerialAndStateArgs = {
  plate_serial?: Maybe<Scalars["String"]>
  state?: Maybe<Scalars["String"]>
}

export type QueryUserArgs = {
  id: Scalars["String"]
}

export type RegisterInput = {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Reservation = {
  __typename?: "Reservation"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  author: User
  description: Scalars["String"]
  title: Scalars["String"]
}

export type ResetPasswordInput = {
  password: Scalars["String"]
  token: Scalars["String"]
}

export type UpdateUserInput = {
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  avatarUrl?: Maybe<Scalars["String"]>
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  email: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  avatarUrl?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  phoneValidated: Scalars["Boolean"]
  emailValidated: Scalars["Boolean"]
  complaints: Array<Complaint>
  listings: Array<Listing>
}

export type ListingsForBoxQueryVariables = {}

export type ListingsForBoxQuery = { __typename?: "Query" } & {
  listings: Array<
    { __typename?: "Listing" } & Pick<
      Listing,
      | "id"
      | "description"
      | "title"
      | "price"
      | "baths"
      | "beds"
      | "reviews"
      | "ratings"
      | "imageAlt"
      | "imageUrl"
    > & {
        author: { __typename?: "User" } & Pick<User, "firstName" | "lastName">
      }
  >
}

export type GetPublicUserQueryVariables = {
  id: Scalars["String"]
}

export type GetPublicUserQuery = { __typename?: "Query" } & {
  user?: Maybe<
    { __typename?: "PublicUserResponse" } & Pick<
      PublicUserResponse,
      "firstName" | "lastName" | "email" | "avatarUrl"
    >
  >
}

export type MyListingsQueryVariables = {}

export type MyListingsQuery = { __typename?: "Query" } & {
  me?: Maybe<
    { __typename?: "User" } & {
      listings: Array<
        { __typename?: "Listing" } & Pick<
          Listing,
          | "imageUrl"
          | "imageAlt"
          | "beds"
          | "baths"
          | "title"
          | "price"
          | "reviews"
          | "ratings"
          | "id"
        >
      >
    }
  >
}

export type MeFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "lastName" | "email" | "avatarUrl"
>

export type MeQueryVariables = {}

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & MeFragment>
}

export type AddNewListingMutationVariables = {
  data: CreateListingInput
}

export type AddNewListingMutation = { __typename?: "Mutation" } & {
  createListing?: Maybe<
    { __typename?: "Listing" } & Pick<Listing, "createdAt" | "id">
  >
}

export type RequestUploadUrlQueryVariables = {
  filename: Scalars["String"]
  contentType: Scalars["String"]
}

export type RequestUploadUrlQuery = { __typename?: "Query" } & Pick<
  Query,
  "generateListingAssetUploadUrl"
>

export type ForgotPasswordMutationVariables = {
  email: Scalars["String"]
}

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>

export type GetListingByIdQueryVariables = {
  id: Scalars["String"]
}

export type GetListingByIdQuery = { __typename?: "Query" } & {
  findListing: { __typename?: "Listing" } & Pick<
    Listing,
    | "createdAt"
    | "updatedAt"
    | "description"
    | "title"
    | "imageUrl"
    | "imageAlt"
    | "beds"
    | "baths"
    | "price"
    | "reviews"
    | "ratings"
  > & {
      author: { __typename?: "User" } & Pick<
        User,
        "firstName" | "lastName" | "id"
      >
    }
}

export type LoginMutationVariables = {
  data: LoginInput
}

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user: { __typename?: "User" } & MeFragment
    }
}

export type RegisterMutationVariables = {
  data: RegisterInput
}

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user: { __typename?: "User" } & MeFragment
    }
}

export type ResetPasswordMutationVariables = {
  data: ResetPasswordInput
}

export type ResetPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "resetPassword"
>

export const MeFragmentDoc = gql`
  fragment Me on User {
    id
    firstName
    lastName
    email
    avatarUrl
  }
`
export const ListingsForBoxDocument = gql`
  query listingsForBox {
    listings {
      id
      description
      title
      author {
        firstName
        lastName
      }
      price
      baths
      beds
      reviews
      ratings
      imageAlt
      imageUrl
    }
  }
`

/**
 * __useListingsForBoxQuery__
 *
 * To run a query within a React component, call `useListingsForBoxQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingsForBoxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingsForBoxQuery({
 *   variables: {
 *   },
 * });
 */
export function useListingsForBoxQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ListingsForBoxQuery,
    ListingsForBoxQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    ListingsForBoxQuery,
    ListingsForBoxQueryVariables
  >(ListingsForBoxDocument, baseOptions)
}
export function useListingsForBoxLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ListingsForBoxQuery,
    ListingsForBoxQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    ListingsForBoxQuery,
    ListingsForBoxQueryVariables
  >(ListingsForBoxDocument, baseOptions)
}
export type ListingsForBoxQueryHookResult = ReturnType<
  typeof useListingsForBoxQuery
>
export type ListingsForBoxLazyQueryHookResult = ReturnType<
  typeof useListingsForBoxLazyQuery
>
export type ListingsForBoxQueryResult = ApolloReactCommon.QueryResult<
  ListingsForBoxQuery,
  ListingsForBoxQueryVariables
>
export const GetPublicUserDocument = gql`
  query GetPublicUser($id: String!) {
    user(id: $id) {
      firstName
      lastName
      email
      avatarUrl
    }
  }
`

/**
 * __useGetPublicUserQuery__
 *
 * To run a query within a React component, call `useGetPublicUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPublicUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPublicUserQuery,
    GetPublicUserQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetPublicUserQuery,
    GetPublicUserQueryVariables
  >(GetPublicUserDocument, baseOptions)
}
export function useGetPublicUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPublicUserQuery,
    GetPublicUserQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetPublicUserQuery,
    GetPublicUserQueryVariables
  >(GetPublicUserDocument, baseOptions)
}
export type GetPublicUserQueryHookResult = ReturnType<
  typeof useGetPublicUserQuery
>
export type GetPublicUserLazyQueryHookResult = ReturnType<
  typeof useGetPublicUserLazyQuery
>
export type GetPublicUserQueryResult = ApolloReactCommon.QueryResult<
  GetPublicUserQuery,
  GetPublicUserQueryVariables
>
export const MyListingsDocument = gql`
  query myListings {
    me {
      listings {
        imageUrl
        imageAlt
        beds
        baths
        title
        price
        reviews
        ratings
        id
      }
    }
  }
`

/**
 * __useMyListingsQuery__
 *
 * To run a query within a React component, call `useMyListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyListingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyListingsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MyListingsQuery,
    MyListingsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<MyListingsQuery, MyListingsQueryVariables>(
    MyListingsDocument,
    baseOptions,
  )
}
export function useMyListingsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MyListingsQuery,
    MyListingsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    MyListingsQuery,
    MyListingsQueryVariables
  >(MyListingsDocument, baseOptions)
}
export type MyListingsQueryHookResult = ReturnType<typeof useMyListingsQuery>
export type MyListingsLazyQueryHookResult = ReturnType<
  typeof useMyListingsLazyQuery
>
export type MyListingsQueryResult = ApolloReactCommon.QueryResult<
  MyListingsQuery,
  MyListingsQueryVariables
>
export const MeDocument = gql`
  query Me {
    me {
      ...Me
    }
  }
  ${MeFragmentDoc}
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MeQuery,
    MeQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>
export const AddNewListingDocument = gql`
  mutation AddNewListing($data: CreateListingInput!) {
    createListing(data: $data) {
      createdAt
      id
    }
  }
`

/**
 * __useAddNewListingMutation__
 *
 * To run a mutation, you first call `useAddNewListingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewListingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewListingMutation, { data, loading, error }] = useAddNewListingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddNewListingMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddNewListingMutation,
    AddNewListingMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AddNewListingMutation,
    AddNewListingMutationVariables
  >(AddNewListingDocument, baseOptions)
}
export type AddNewListingMutationHookResult = ReturnType<
  typeof useAddNewListingMutation
>
export type AddNewListingMutationResult = ApolloReactCommon.MutationResult<
  AddNewListingMutation
>
export type AddNewListingMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddNewListingMutation,
  AddNewListingMutationVariables
>
export const RequestUploadUrlDocument = gql`
  query RequestUploadUrl($filename: String!, $contentType: String!) {
    generateListingAssetUploadUrl(
      filename: $filename
      contentType: $contentType
    )
  }
`

/**
 * __useRequestUploadUrlQuery__
 *
 * To run a query within a React component, call `useRequestUploadUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestUploadUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestUploadUrlQuery({
 *   variables: {
 *      filename: // value for 'filename'
 *      contentType: // value for 'contentType'
 *   },
 * });
 */
export function useRequestUploadUrlQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RequestUploadUrlQuery,
    RequestUploadUrlQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    RequestUploadUrlQuery,
    RequestUploadUrlQueryVariables
  >(RequestUploadUrlDocument, baseOptions)
}
export function useRequestUploadUrlLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RequestUploadUrlQuery,
    RequestUploadUrlQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    RequestUploadUrlQuery,
    RequestUploadUrlQueryVariables
  >(RequestUploadUrlDocument, baseOptions)
}
export type RequestUploadUrlQueryHookResult = ReturnType<
  typeof useRequestUploadUrlQuery
>
export type RequestUploadUrlLazyQueryHookResult = ReturnType<
  typeof useRequestUploadUrlLazyQuery
>
export type RequestUploadUrlQueryResult = ApolloReactCommon.QueryResult<
  RequestUploadUrlQuery,
  RequestUploadUrlQueryVariables
>
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, baseOptions)
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<
  ForgotPasswordMutation
>
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>
export const GetListingByIdDocument = gql`
  query GetListingById($id: String!) {
    findListing(id: $id) {
      createdAt
      updatedAt
      description
      title
      author {
        firstName
        lastName
        id
      }
      imageUrl
      imageAlt
      beds
      baths
      price
      reviews
      ratings
    }
  }
`

/**
 * __useGetListingByIdQuery__
 *
 * To run a query within a React component, call `useGetListingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListingByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetListingByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetListingByIdQuery,
    GetListingByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetListingByIdQuery,
    GetListingByIdQueryVariables
  >(GetListingByIdDocument, baseOptions)
}
export function useGetListingByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetListingByIdQuery,
    GetListingByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetListingByIdQuery,
    GetListingByIdQueryVariables
  >(GetListingByIdDocument, baseOptions)
}
export type GetListingByIdQueryHookResult = ReturnType<
  typeof useGetListingByIdQuery
>
export type GetListingByIdLazyQueryHookResult = ReturnType<
  typeof useGetListingByIdLazyQuery
>
export type GetListingByIdQueryResult = ApolloReactCommon.QueryResult<
  GetListingByIdQuery,
  GetListingByIdQueryVariables
>
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
  RegisterMutation
>
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const ResetPasswordDocument = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument, baseOptions)
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<
  ResetPasswordMutation
>
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>
