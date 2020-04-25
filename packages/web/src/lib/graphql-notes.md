# Graphql Notes

## Generated typescript types
The Typescript file `graphql.tsx` is from `yarn generate`, which runs `graphql-codegen`, do not edit by hand.

## WebStorm GraphQL plugin
When using wing the GraphQL plugin, generate the `schema.graphql` file so that the plugin is able to schema.
The plugin can then resolve code written in gql.

E.g. it would enable you to click through `findListing`
```
export const FIND_LISTING = gql`
  query GetListingById($id: String!) {
    findListing(id: $id) {
      createdAt
      updatedAt
      description
      title
      author {
        firstName
        lastName
      }
    }
  }
`
```

- The config file is at the root, called `.graphqlconfig`.
- The file generated is also at the root, called `schema.graphql`, do not edit.
- This file is purposely `.gitignore`'d and can be generated if needed, for IDE plugin.
