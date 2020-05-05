import { BeforeInsert, BeforeUpdate, Entity, OneToMany } from "typeorm"
import { Field, ObjectType } from "type-graphql"
import bcrypt from "bcryptjs"

import { BaseEntity } from "../shared/base.entity"
import { BooleanField, StringField } from "../shared/fields"
import { Complaint } from "./complaint.entity"
import { Listing } from "./listing.entity"

@ObjectType()
@Entity()
export class User extends BaseEntity<User> {
  @StringField({ unique: true })
  email: string

  @StringField({ graphql: false })
  password: string

  @StringField()
  firstName: string

  @StringField()
  lastName: string

  // this should be validated by sms
  @StringField({nullable: true})
  phone: string

  @BooleanField({default: false})
  phoneValidated: boolean

  @BooleanField({default: false})
  emailValidated: boolean

  // user may have written many complaints
  @Field(type => [Complaint])
  @OneToMany(
    type => Complaint,
    complaint => complaint.author,
    { lazy: true, cascade: ["update"] },
  )
  complaints: Complaint[]

  @Field(type => [Listing])
  @OneToMany(
    type => Listing,
    listing => listing.author,
    { lazy: true, cascade: ["update"] },
  )
  listings: Listing[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
