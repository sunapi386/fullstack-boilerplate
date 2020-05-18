import { InputType, Field } from "type-graphql"
	
import { Complaint } from "../complaint.entity"

@InputType()
export class CreateComplaintInput implements Partial<Complaint> {
  @Field({ nullable: true })
  description?: string

  @Field()
  title: string

  @Field()
  plate_serial: string

  @Field()
  state: string
}
