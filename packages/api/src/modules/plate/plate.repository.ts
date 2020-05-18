import { Service } from "typedi"
import { Plate } from "./plate.entity"

@Service()
export class PlateRepository {
  findById(plateId: string): Promise<Plate> {
    return Plate.findOneOrFail(plateId)
  }

  findAll(): Promise<Plate[]> {
    return Plate.find()
  }
}
