import { InputType } from "type-graphql"
import { IntField, StringField } from "../../shared/fields"

@InputType()
export class CreateListingInput {
  @StringField()
  title: string

  @StringField()
  description: string

  // Images
  @StringField({ nullable: true })
  imageUrl: string

  @StringField({ nullable: true })
  imageAlt: string

  @IntField()
  price: number

  @IntField({ nullable: true })
  beds: number

  @IntField({ nullable: true })
  baths: number
}
