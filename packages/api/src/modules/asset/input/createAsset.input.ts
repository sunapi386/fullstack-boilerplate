import { InputType, Field} from "type-graphql"
	
import { Asset } from "../asset.entity"

@InputType()
export class CreateAssetInput implements Partial<Asset> {
  @Field(type => String, { nullable: true })
  filename?: string
}
