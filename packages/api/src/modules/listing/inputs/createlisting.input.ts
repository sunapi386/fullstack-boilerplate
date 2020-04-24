import { InputType } from "type-graphql"
import { StringField } from "../../shared/fields"

@InputType()
export class CreateListingInput {
  // Images

  @StringField()
  title: string

  @StringField()
  description: string
}
