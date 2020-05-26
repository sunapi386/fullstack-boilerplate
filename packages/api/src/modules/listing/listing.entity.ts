import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { IntField, StringField } from "../shared/fields"
import { User } from "../user/user.entity"
import { RelationColumn } from "../shared/helpers"
import { Address } from "../address/address.entity"
import { S3_URL } from "../../lib/config"

@ObjectType()
@Entity()
export class Listing extends BaseEntity<Listing> {
  // user can have multiple listing
  @ManyToOne((type) => User)
  @JoinColumn({ name: "authorId" })
  author: User
  @RelationColumn()
  authorId: string

  @StringField()
  description: string

  @StringField()
  title: string

  @StringField({ graphql: false, nullable: true, array: true })
  imageKeys: string[]

  @IntField({ nullable: true })
  beds: number

  @IntField({ nullable: true })
  baths: number

  @IntField()
  price: number

  // todo actually create ratings entity and reviews entity instead of a fake number
  @IntField({ nullable: true })
  reviews: number

  @IntField({ nullable: true })
  ratings: number

  @OneToOne((type) => Address)
  @JoinColumn()
  address: Address

  // HELPERS
  @Field(() => [String], { nullable: true })
  imageUrls() {
    if (this.imageKeys && Array.isArray(this.imageKeys)) {
      return this.imageKeys.map((key) => S3_URL + key)
    } else {
      console.log(this.imageKeys, "not an array or missing")
      return []
    }
  }
}
