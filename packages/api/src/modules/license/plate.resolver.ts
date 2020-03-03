import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  ResolverInterface,
  Args,
  Authorized,
} from "type-graphql"
import { Inject } from "typedi"

import { Plate } from "./plate.entity"
import { PlateService } from "./plate.service"
import { UserInputError } from "apollo-server-express"
import { CreatePlateInput } from "./inputs/createplate.input"
import { GetPlateArgs } from "./inputs/getplate.args"
import { Complaint } from "../complaint/complaint.entity"

@Resolver(() => Plate)
export class PlateResolver implements ResolverInterface<Plate> {
  @Inject(() => PlateService)
  plateService: PlateService

  // QUERY ALL PLATES
  @Query(() => [Plate])
  async getAllPlates(): Promise<Plate[]> {
    return await this.plateService.findAll()
  }

  // QUERY A SPECIFIC PLATE BY PLATE_NUMBER
  @Query(() => Plate)
  async findByPlateSerialAndState(@Args() args: GetPlateArgs): Promise<Plate> {
    const plate = await this.plateService.findByPlateSerialAndState(args)
    if (plate === undefined) {
      throw new UserInputError(args.state + " " + args.plate_serial)
    }
    return plate
  }

  @FieldResolver()
  async complaints(@Root() plate: Plate): Promise<Complaint[]> {
    // const allComplaintsAssociated = await this.complaintRepository.findByIds(plate.complaints.map((complaint) => {return complaint.id}))
    // return allComplaintsAssociated
    return plate.complaints
  }

  @Authorized() // must be logged in to create a new license plate
  @Mutation(() => Plate)
  async createPlate(@Arg("data") data: CreatePlateInput): Promise<Plate> {
    return this.plateService.createPlate(data)
  }

  @Authorized("ADMIN") // must be admin to delete plate
  @Mutation(() => Boolean)
  async deletePlateNumber(@Arg("id") id: string): Promise<boolean> {
    return this.plateService.destroyPlate(id)
  }
}
