import { InputType, Field } from "type-graphql"
	
import { Reservation } from "../reservation.entity"

@InputType()
export class CreateReservationInput implements Partial<Reservation> {
  @Field({ nullable: true })
  description?: string
}
