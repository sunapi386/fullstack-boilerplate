import { InputType} from "type-graphql"
	
import { Listing } from "../listing.entity"
import { IntField, StringField } from "../../shared/fields"

@InputType()
export class CreateListingInput implements Partial<Listing> {
  @StringField()
  title: string

  @StringField()
  description: string

  @StringField({ array: true, nullable: true })
  imageKeys: string[]

  @IntField()
  price: number

  @IntField({ nullable: true })
  beds: number

  @IntField({ nullable: true })
  baths: number
}	
