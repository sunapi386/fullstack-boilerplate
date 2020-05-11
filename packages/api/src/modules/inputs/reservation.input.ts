import { Field, InputType } from "type-graphql"

@InputType()
export class ReservationInput {
  @Field({ nullable: true })
  description?: string
}
