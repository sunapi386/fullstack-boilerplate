import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Inject } from "typedi"

import { Complaint } from "./complaint.entity"
import { ComplaintService } from "./complaint.service"
import { UserInputError } from "apollo-server-express"
import { CreateComplaintInput } from "./inputs/createcomplaint.input"
import { Repository } from "typeorm"
import { Plate } from "../license/plate.entity"
import { PlateService } from "../license/plate.service"

@Resolver(() => Complaint)
export class ComplaintResolver {
  @Inject(() => ComplaintService)
  complaintService: ComplaintService

  // QUERY ALL COMPLAINTS
  @Query(() => [Complaint], { nullable: true })
  async getAllComplaints() {
    return await this.complaintService.findAll()
  }

  // QUERY A SPECIFIC Complaint BY Complaint_NUMBER
  @Query(() => Complaint, { nullable: true })
  async findByComplaint(
    @Arg("state") state: string,
    @Arg("plate_serial") plate_serial: string,
  ) {
    const complaint = await this.complaintService.find(state, plate_serial)
    if (complaint === undefined) {
      throw new UserInputError(
        plate_serial + " in " + state + " found no complaints",
      )
    }
    return complaint
  }

  // CREATE A Complaint, MUST BE A USER?
  @Mutation(() => Complaint)
  async createComplaint(@Arg("data") input: CreateComplaintInput) {
    return this.complaintService.create(input)
  }

  // // DELETE Complaint, MUST BE USER?
  // @Mutation(() => Boolean)
  // async destroyComplaintNumber(
  //   @Arg("data") data: CreateComplaintInput,
  // ): Promise<boolean> {
  //   return this.service.destroy(data.id)
  // }
}
