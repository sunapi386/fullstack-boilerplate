import { InputType} from "type-graphql"
	
import { Plate } from "../plate.entity"

@InputType()
export class UpdatePlateInput implements Partial<Plate> {
  
}	
