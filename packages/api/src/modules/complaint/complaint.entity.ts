import { Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm"
import { ObjectType } from "type-graphql"

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
    () => User,
    user => user.complaints,
  )
  user: User

  // Complaint can have multiple LicensePlates, and each LicensePlates can have multiple Complaints.
  // A complaint must have at least 1 Plate
  @ManyToMany(() => Plate)
  @JoinTable()
  plates: Plate[]

  // complaint description
  @StringField()
  description: string

  // todo: add photo or video
}
