// import { PlateInputError } from "apollo-server-express"
import { Service } from "typedi"

import { Plate } from "./plate.entity"
import { CreatePlateInput } from "./inputs/createplate.input"
import { UserInputError } from "apollo-server-express"

@Service()
export class PlateService {
  async create(data: CreatePlateInput) {
    await this.checkPlateExists({ plate_serial: data.plate_serial })
    return await Plate.create(data).save()
  }

  async update(PlateId: string, data: Partial<Plate>): Promise<Plate> {
    const found = await Plate.findOneOrFail(PlateId)
    // make sure we're not accidentally updating the plate number to something else that already exists
    if (
      data.plate_serial &&
      found.plate_serial !== data.plate_serial.toLowerCase().trim()
    ) {
      await this.checkPlateExists({ plate_serial: data.plate_serial })
    }
    return found.update(data)
  }

  async destroy(PlateId: string): Promise<boolean> {
    const plate = await Plate.findOneOrFail({ plate_serial: PlateId })
    return plate.destroy()
  }

  async findByPlateNumber(plate: CreatePlateInput) {
    return Plate.findOneOrFail({
      plate_serial: plate.plate_serial,
      state: plate.state,
    })
  }

  async findAll() {
    return Plate.find()
  }

  async checkPlateExists(field: Partial<Plate>) {
    const user = await Plate.find({ where: field })
    if (user.length > 0) {
      throw new UserInputError("A plate with these details already exists")
    }
  }
}
