import { InputType, Field } from "type-graphql"
import { Complaint } from "../complaint.entity"
import { Plate } from "../../license/plate.entity"
import { User } from "../../user/user.entity"
import { ManyToMany } from "typeorm"
import { StringField } from "../../shared/fields"

@InputType()
export class CreateComplaintInput {
  @Field()
  description: string

  @Field()
  title: string

  @Field()
  plate_serial: string

  @Field()
  state: string
}
