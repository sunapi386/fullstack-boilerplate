import { InputType} from "type-graphql"
	
import { Reservation } from "../reservation.entity"

@InputType()
export class UpdateReservationInput implements Partial<Reservation> {
  
}	
