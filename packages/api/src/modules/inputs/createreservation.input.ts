import { Field, InputType } from "type-graphql"

@InputType()
export class CreateReservationInput {
  @Field({ nullable: true })
  description?: string
}
