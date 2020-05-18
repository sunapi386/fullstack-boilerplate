import { InputType} from "type-graphql"

import { Address } from "../address.entity"
import { IsNotEmpty } from "class-validator"
import { StringField } from "../../shared/fields"

@InputType()
export class UpdateAddressInput implements Partial<Address> {
  @IsNotEmpty()
  @StringField({ nullable: true })
  unit: string

  @IsNotEmpty()
  @StringField({ nullable: true })
  street: string

  @IsNotEmpty()
  @StringField({ nullable: true })
  city: string

  @IsNotEmpty()
  @StringField({ nullable: true })
  country: string

  @IsNotEmpty()
  @StringField({ nullable: true })
  zipcode: string
}
