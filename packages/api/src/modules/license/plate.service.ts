import { Service } from "typedi"

import { Plate } from "./plate.entity"
import { CreatePlateInput } from "./inputs/createplate.input"
import { UserInputError } from "apollo-server-express"
import { GetPlateArgs } from "./inputs/getplate.args"

@Service()
export class PlateService {
  async createPlate(data: CreatePlateInput) {
    await this.checkPlateExists(data)
    const plate = Plate.create(data)
    plate.complaints = []
    return await plate.save()
  }

  async updatePlate(PlateId: string, data: Partial<Plate>): Promise<Plate> {
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

  async destroyPlate(id: string): Promise<boolean> {
    const plate = await Plate.findOneOrFail({ id: id })
    return plate.destroy()
  }

  async findByPlateSerialAndState(args: GetPlateArgs): Promise<Plate> {
    return Plate.findOneOrFail({
      plate_serial: args.plate_serial,
      state: args.state,
    })
  }

  async findAll() {
    return Plate.find()
  }

  async checkPlateExists(field: Partial<Plate>) {
    const plate = await Plate.find({ where: field }) // todo: does this actually work
    if (plate.length > 0) {
      throw new UserInputError("A plate with these details already exists")
    }
  }
}
