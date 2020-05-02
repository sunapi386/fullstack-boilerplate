import { Field, InputType } from "type-graphql"

@InputType()
export class CreateComplaintInput {
  @Field({ nullable: true })
  description?: string

  @Field()
  title: string

  @Field()
  plate_serial: string

  @Field()
  state: string
}
