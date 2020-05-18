import { InputType} from "type-graphql"
	
import { Listing } from "../listing.entity"

@InputType()
export class UpdateListingInput implements Partial<Listing> {
  
}	
