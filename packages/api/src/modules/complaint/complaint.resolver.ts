import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql"
import { Inject } from "typedi"

import { Complaint } from "./complaint.entity"
import { ComplaintService } from "./complaint.service"
import { UserInputError } from "apollo-server-express"
import { CreateComplaintInput } from "./inputs/createcomplaint.input"
import { User } from "../user/user.entity"

@Resolver(() => Complaint)
export class ComplaintResolver {
  @Inject(() => ComplaintService)
  complaintService: ComplaintService

  // anyone can read complaints collection
  @Query(() => [Complaint])
  async getAllComplaints(): Promise<Complaint[]> {
    return await this.complaintService.findAll()
  }

  // anyone can read a specific Complaint
  @Query(() => Complaint)
  async findByComplaint(
    @Arg("state") state: string,
    @Arg("plate_serial") plate_serial: string,
  ): Promise<Complaint> {
    const complaint = await this.complaintService.find(state, plate_serial)
    if (complaint === undefined) {
      throw new UserInputError(
        plate_serial + " in " + state + " found no complaints",
      )
    }
    return complaint
  }

  @Authorized() // only logged in users can add complaints
  @Mutation(() => Complaint)
  async createComplaint(@Arg("data") input: CreateComplaintInput) {
    return this.complaintService.create(input)
  }

  @FieldResolver(returns => User)
  async author(@Root() complaint: Complaint) {
    const author = await User.find(complaint.author)
    if (!author) throw new UserInputError("User not found")
    return author
  }

  @Authorized("ADMIN") // only admin can delete stuff
  @Mutation(() => Boolean)
  async deleteComplaintNumber(@Arg("id") id: string): Promise<boolean> {
    return this.complaintService.destroy(id)
  }
}
