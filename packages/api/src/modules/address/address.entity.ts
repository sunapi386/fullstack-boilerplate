import { Entity, OneToOne } from "typeorm"
import { ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"
import { FloatField } from "../shared/fields/FloatField"
import { User } from "../user/user.entity"
import { Listing } from "../listing/listing.entity"

@ObjectType()
@Entity()
export class Address extends BaseEntity<Address> {
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

  @OneToOne(() => User, (user: User) => user.address)
  user: User

  @OneToOne(() => Listing, (listing: Listing) => listing.address)
  listing: Listing

  // User adjusts coordinates, if the address resolved is not satisfactory
  @FloatField({nullable: true})
  lat: number

  @FloatField({nullable: true})
  lng: number
}
