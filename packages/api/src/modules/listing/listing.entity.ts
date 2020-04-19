import { Entity } from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"
import { User } from "../user/user.entity"
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

  // todo: add photo or video
}
