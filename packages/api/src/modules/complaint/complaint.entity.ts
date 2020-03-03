import { Entity, ManyToOne } from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"
import { User } from "../user/user.entity"
import { Plate } from "../license/plate.entity"

@ObjectType()
@Entity()
export class Complaint extends BaseEntity<Complaint> {
  // user can have multiple complaints
  // but each complaint is owned by one single user (who is the author)
  @ManyToOne(
    returns => User,
    user => user.complaints,
  )
  author: User

  // Complaint is against a single Plate, but Plates can have multiple Complaints.
  // this covers the majority of cases, we tend to want to complain against a specific driver
  // rather than a collection of drivers (which is more rare, if ever)
  @ManyToOne(
    () => Plate,
    plate => plate.complaints,
  )
  @Field(() => Plate)
  plate: Plate

  @StringField()
  description: string

  @StringField()
  title: string

  // todo: add photo or video
}
