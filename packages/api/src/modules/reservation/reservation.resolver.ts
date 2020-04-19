import { Resolver } from "type-graphql"
import { Inject } from "typedi"

import { Reservation } from "./reservation.entity"
import { ReservationService } from "./reservation.service"

@Resolver(() => Reservation)
export class ReservationResolver {
  @Inject(() => ReservationService)
  reservationService: ReservationService
}
