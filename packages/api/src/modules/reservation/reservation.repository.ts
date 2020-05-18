import { Service } from "typedi"
import { Reservation } from "./reservation.entity"

@Service()
export class ReservationRepository {
  findById(reservationId: string): Promise<Reservation> {
    return Reservation.findOneOrFail(reservationId)
  }

  findAll(): Promise<Reservation[]> {
    return Reservation.find()
  }
}
