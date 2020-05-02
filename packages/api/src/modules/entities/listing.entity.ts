import { Entity } from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { IntField, StringField } from "../shared/fields"
import { User } from "./user.entity"
import { RelationColumn } from "../shared/helpers"

@ObjectType()
@Entity()
export class Listing extends BaseEntity<Listing> {
  // user can have multiple listing
  @Field(type => User)
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
}
