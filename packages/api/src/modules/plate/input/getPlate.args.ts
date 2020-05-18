import { ArgsType, Field } from "type-graphql"
import { Plate } from "../plate.entity"

@ArgsType()
export class GetPlateArgs implements Partial<Plate>{
  @Field(type => String, { nullable: true })
  plate_serial?: string

  @Field(type => String, { nullable: true })
  state?: string
}
