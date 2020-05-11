import { Entity, ManyToOne } from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"
import { User } from "./user.entity"
import { RelationColumn } from "../shared/helpers"

// Calling this Asset instead of Imageurl,
// Asset entity is more abstract than Imageurl
// e.g. then it is possible to pull up all of the
// user's upload files and that includes images

@ObjectType()
@Entity()
export class Asset extends BaseEntity<Asset> {
  @Field(() => User)
  @ManyToOne(()=>User, user => user.assets)
  author: User
  @RelationColumn()
  authorId: string

  @StringField()
  filename: string

  @StringField()
  contentType: string

  @StringField()
  url: string
}
