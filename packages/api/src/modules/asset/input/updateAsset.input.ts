import { InputType} from "type-graphql"
	
import { Asset } from "../asset.entity"

@InputType()
export class UpdateAssetInput implements Partial<Asset> {
  
}	
