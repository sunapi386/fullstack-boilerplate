import { Field, InputType } from "type-graphql"

@InputType()
export class CreateListingInput {
  @Field({ nullable: true })
  description?: string
}
