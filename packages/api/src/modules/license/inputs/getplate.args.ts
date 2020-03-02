import { Field, ArgsType } from "type-graphql"

@ArgsType()
export class GetPlateArgs {
  @Field(type => String, { nullable: true })
  plate_serial?: string

  @Field(type => String, { nullable: true })
  state?: string
}
