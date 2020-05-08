import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm"
import { ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { IntField, StringField } from "../shared/fields"
import { User } from "./user.entity"
import { RelationColumn } from "../shared/helpers"
import { Address } from "./address.entity"

@ObjectType()
@Entity()
export class Listing extends BaseEntity<Listing> {
  // user can have multiple listing
  @ManyToOne(type => User)
  @JoinColumn({name: 'authorId'})
  author: User
  @RelationColumn()
  authorId: string

  @StringField()
  description: string

  @StringField()
  title: string

  // todo: add photo or video in S3
  @StringField({ nullable: true })
  imageUrl: string

  @StringField({ nullable: true })
  imageAlt: string

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

  @OneToOne(type => Address)
  @JoinColumn()
  address: Address
}
