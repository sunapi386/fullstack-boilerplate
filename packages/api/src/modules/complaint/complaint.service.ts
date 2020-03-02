// import { ComplaintInputError } from "apollo-server-express"
import { Service } from "typedi"

import { Complaint } from "./complaint.entity"
import { CreateComplaintInput } from "./inputs/createcomplaint.input"
import { UserInputError } from "apollo-server-express"
import { Repository } from "typeorm"
import { Plate } from "../license/plate.entity"
import { PlateService } from "../license/plate.service"
import { GetPlateArgs } from "../license/inputs/getplate.args"

@Service()
export class ComplaintService {
  complaintRepository: Repository<Complaint>
  plateRepository: Repository<Plate>
  plateService: PlateService

  async create(data: CreateComplaintInput) {
    await this.checkComplaintExists(data)
    const complaint = Complaint.create(data)

    // the license must exist, if not found then create one
    const getPlateArgs = { plate_serial: data.plate_serial, state: data.state }
    let plate = await this.plateService.findByPlateNumberAndState(getPlateArgs)
    if (plate === undefined) {
      plate = await this.plateService.createPlate(getPlateArgs)
    }
    complaint.plate = plate

    return await complaint.save()
  }

  async update(
    ComplaintId: string,
    data: Partial<Complaint>,
  ): Promise<Complaint> {
    const found = await Complaint.findOneOrFail(ComplaintId)
    return found.update(data)
  }

  async destroy(ComplaintId: string): Promise<boolean> {
    const complaint = await Complaint.findOneOrFail({ id: ComplaintId })
    return complaint.destroy()
  }

  async find(state: string, plate_serial: string) {
    // return Complaint.getRepository()
    //   .createQueryBuilder("Complaint")
    //   .where("user.complaints", {})
    //   .leftJoinAndSelect("Complaint.complaints", "complaint")
    //   .getMany()
    return Complaint.getRepository().findOne({
      where: { plate: { plate_serial: plate_serial, state: state } },
    })
  }

  async findAll() {
    return Complaint.find()
  }

  async checkComplaintExists(field: Partial<Complaint>) {
    const complaint = await Complaint.find({ where: field })
    if (complaint.length > 0) {
      throw new UserInputError("Complaint with these details already exists")
    }
  }
}
