import { Field, InputType } from "type-graphql"
import { Plate } from "../entities/plate.entity"

@InputType()
export class CreatePlateInput implements Partial<Plate> {
  @Field()
  plate_serial: string

  @Field()
  state: string
}
