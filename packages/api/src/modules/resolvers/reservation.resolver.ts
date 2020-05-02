import { Resolver } from "type-graphql"
import { Inject } from "typedi"

import { Reservation } from "../entities/reservation.entity"
import { ReservationService } from "../services/reservation.service"

@Resolver(() => Reservation)
export class ReservationResolver {
  @Inject(() => ReservationService)
  reservationService: ReservationService
}
