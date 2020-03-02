// import { PlateInputError } from "apollo-server-express"
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
    plate.complaints = data.complaints === undefined ? [] : data.complaints
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

  async destroyPlate(PlateId: string): Promise<boolean> {
    const plate = await Plate.findOneOrFail({ plate_serial: PlateId })
    return plate.destroy()
  }

  async findByPlateNumberAndState(args: GetPlateArgs) {
    return (
      Plate.getRepository()
        // .find({
        //   where:
        //     {
        //       plate_serial: plate.plate_serial, state: plate.state
        //     }
        // })
        .createQueryBuilder("plate")
        .where("plate.plate_serial = :sn", { sn: args.plate_serial })
        .andWhere("plate.state = :st", { st: args.state })
        .leftJoinAndSelect("plate.complaints", "complaint")
        .getOne()
    )
    // return Plate.findOneOrFail({
    //   plate_serial: plate.plate_serial,
    //   state: plate.state,
    // })
    // return Plate.findOne()
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
