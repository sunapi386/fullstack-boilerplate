import { Field, InputType } from "type-graphql"
import { Complaint } from "../entities/complaint.entity"

@InputType()
export class ComplaintInput implements Partial<Complaint> {
  @Field({ nullable: true })
  description?: string

  @Field()
  title: string

  @Field()
  plate_serial: string

  @Field()
  state: string
}
