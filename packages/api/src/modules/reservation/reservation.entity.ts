import { Entity } from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"
import { User } from "../user/user.entity"
import { RelationColumn } from "../shared/helpers"

@ObjectType()
@Entity()
export class Reservation extends BaseEntity<Reservation> {
  // user can have multiple reservation
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
