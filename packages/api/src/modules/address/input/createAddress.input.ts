import { InputType} from "type-graphql"
	
import { Address } from "../address.entity"
import { StringField } from "../../shared/fields"

@InputType()
export class CreateAddressInput implements Partial<Address> {
  @StringField({nullable: true})
  unit: string

  @StringField()
  street: string

  @StringField()
  city: string

  @StringField()
  country: string

  @StringField()
  zipcode: string
}	
