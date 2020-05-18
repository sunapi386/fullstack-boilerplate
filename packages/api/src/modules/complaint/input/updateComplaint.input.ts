import { InputType} from "type-graphql"
	
import { Complaint } from "../complaint.entity"

@InputType()
export class UpdateComplaintInput implements Partial<Complaint> {
  
}	
