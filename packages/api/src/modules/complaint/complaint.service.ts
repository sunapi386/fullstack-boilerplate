// import { ComplaintInputError } from "apollo-server-express"
import { Inject, Service } from "typedi"

import { Complaint } from "./complaint.entity"
import { CreateComplaintInput } from "./inputs/createcomplaint.input"
import { UserInputError } from "apollo-server-express"
import { PlateService } from "../license/plate.service"

@Service()
export class ComplaintService {
  @Inject(type => PlateService)
  plateService: PlateService

  async create(currentUserId: string, data: CreateComplaintInput) {
    const complaint = Complaint.create(data)
    complaint.authorId = currentUserId

    // the license must exist, if not found then create one
    const getPlateArgs = { plate_serial: data.plate_serial, state: data.state }
    let plate
    try {
      plate = await this.plateService.findByPlateSerialAndState(getPlateArgs)
    } catch (err) {
      plate = await this.plateService.createPlate(getPlateArgs)
      await plate.save()
    }
    complaint.plateId = plate.id
    await complaint.save()

    return complaint
  }

  async update(
    ComplaintId: string,
    data: Partial<Complaint>,
  ): Promise<Complaint> {
    const found = await Complaint.findOneOrFail(ComplaintId)
    return found.update(data)
  }

  async destroy(id: string): Promise<boolean> {
    const complaint = await Complaint.findOneOrFail({ id: id })
    return complaint.destroy()
  }

  async find(state: string, plate_serial: string) {
    // return Complaint.getRepository()
    //   .createQueryBuilder("Complaint")
    //   .where("user.complaints", {})
    //   .leftJoinAndSelect("Complaint.complaints", "complaint")
    //   .getMany()
    return Complaint.getRepository().find({
      where: { plate: { plate_serial: plate_serial, state: state } },
    })
  }

  async findAll() {
    return Complaint.find()
  }

  // before you check if a complaint exists,
  // think about this:
  // what if I keep wanting to write the same complaint?
  async checkComplaintExists(field: Partial<Complaint>) {
    const complaint = await Complaint.find({ where: field })
    if (complaint.length > 0) {
      throw new UserInputError("Complaint with these details already exists")
    }
  }
}
