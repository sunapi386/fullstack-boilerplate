import {
  Arg,
  Authorized,
  Ctx,
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
import { CurrentUser } from "../shared/context/currentUser"
import { ResolverContext } from "../shared/context/resolver"
import { Plate } from "../license/plate.entity"

@Resolver(() => Complaint)
export class ComplaintResolver {
  @Inject(() => ComplaintService)
  complaintService: ComplaintService

  // anyone can read complaints collection
  @Query(() => [Complaint])
  async getComplaints(): Promise<Complaint[]> {
    return await this.complaintService.findAll()
  }

  // anyone can read a specific Complaint
  @Query(() => [Complaint])
  async findComplaintsFor(
    @Arg("state") state: string,
    @Arg("plate_serial") plate_serial: string,
  ): Promise<Complaint[]> {
    const complaint = await this.complaintService.find(state, plate_serial)
    if (complaint === undefined) {
      throw new UserInputError(
        plate_serial + " in " + state + " found no complaints",
      )
    }
    return complaint
  }

  @Authorized() // only logged in users can add complaints
  @Mutation(() => Complaint, { nullable: true })
  async createComplaint(
    // @Ctx() { req }: ResolverContext,
    @CurrentUser() currentUser: User,
    @Arg("data") input: CreateComplaintInput,
  ): Promise<Complaint> {
    return this.complaintService.create(currentUser.id, input)
  }

  @Authorized("ADMIN") // only admin can delete stuff
  @Mutation(() => Boolean)
  async deleteComplaintNumber(@Arg("id") id: string): Promise<boolean> {
    return this.complaintService.destroy(id)
  }

  @FieldResolver(returns => User)
  async author(@Root() complaint: Complaint) {
    const author = await User.findOne(complaint.authorId)
    if (!author)
      throw new UserInputError("User not found " + complaint.authorId)
    return author
  }

  @FieldResolver(returns => Plate)
  async plate(@Root() complaint: Complaint) {
    const plate = await Plate.findOne(complaint.plateId)
    if (!plate) throw new UserInputError("Plate not found " + complaint.plateId)
    return plate
  }
}
