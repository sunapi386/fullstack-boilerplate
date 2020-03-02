import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"
import { Complaint } from "../complaint/complaint.entity"
import { User } from "../user/user.entity"

@ObjectType()
@Entity()
export class Plate extends BaseEntity<Plate> {
  // state + plate serial uniquely identifies a plate

  @StringField()
  plate_serial: string

  @StringField()
  state: string

  // Plate can have multiple Complaints
  @Field(type => [Complaint])
  @OneToMany(
    type => Complaint,
    complaint => complaint.plate,
    { lazy: true, cascade: ["insert"] },
  )
  complaints: Complaint[]

  @Field(type => User)
  @ManyToOne(type => User, { lazy: true })
  author: User
}
