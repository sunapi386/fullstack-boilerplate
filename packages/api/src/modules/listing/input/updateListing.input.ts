import { InputType} from "type-graphql"
	
import { Listing } from "../listing.entity"
import { IntField, StringField } from "../../shared/fields"

@InputType()
export class UpdateListingInput implements Partial<Listing> {
  @StringField({ nullable: true })
  title: string

  @StringField({ nullable: true })
  description: string

  @StringField({ array: true, nullable: true })
  imageKeys: string[]

  @IntField({ nullable: true })
  price: number

  @IntField({ nullable: true })
  beds: number

  @IntField({ nullable: true })
  baths: number
}	
