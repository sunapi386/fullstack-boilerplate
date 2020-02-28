import { Entity, BeforeInsert, OneToMany } from "typeorm"
import { ObjectType } from "type-graphql"
import bcrypt from "bcryptjs"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"
import { Complaint } from "../complaint/complaint.entity"

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

  // user may have written many complaints
  @OneToMany(
    type => Complaint,
    complaint => complaint.user,
  )
  complaints: Complaint[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
