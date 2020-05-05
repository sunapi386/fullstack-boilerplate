import { Entity } from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"
import { User } from "./user.entity"
import { RelationColumn } from "../shared/helpers"

@ObjectType()
@Entity()
export class Fileurl extends BaseEntity<Fileurl> {
  @Field(() => User)
  author: User
  @RelationColumn()
  authorId: string

  @StringField()
  description: string

  @StringField()
  url: string
}
