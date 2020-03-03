import { InputType, Field } from "type-graphql"
import { User } from "../../user/user.entity"

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
