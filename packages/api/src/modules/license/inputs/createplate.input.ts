import { InputType, Field } from "type-graphql"
import { Plate } from "../plate.entity"
import { Complaint } from "../../complaint/complaint.entity"

@InputType()
export class CreatePlateInput implements Partial<Plate> {
  @Field()
  plate_serial: string

  @Field()
  state: string
}
