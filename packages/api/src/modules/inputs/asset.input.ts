import { ArgsType, Field } from "type-graphql"
import { Asset } from "../entities/asset.entity"

@ArgsType()
export class CreateAssetInput implements Partial<Asset>{
  @Field(type => String, { nullable: true })
  filename?: string
}
