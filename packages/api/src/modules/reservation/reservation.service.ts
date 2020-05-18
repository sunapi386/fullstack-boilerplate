import { Service } from "typedi"
import { Reservation } from "./reservation.entity"

@Service()
export class ReservationService {
  async findAll(): Promise<Reservation[]> {
    return await Reservation.find()
  }
}
