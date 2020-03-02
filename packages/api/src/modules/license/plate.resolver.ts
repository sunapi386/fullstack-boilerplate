import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  ResolverInterface,
  Args,
} from "type-graphql"
import { Inject } from "typedi"

import { Plate } from "./plate.entity"
import { PlateService } from "./plate.service"
import { UserInputError } from "apollo-server-express"
import { CreatePlateInput } from "./inputs/createplate.input"
import { GetPlateArgs } from "./inputs/getplate.args"
import { Repository } from "typeorm"
import { Complaint } from "../complaint/complaint.entity"

@Resolver(() => Plate)
export class PlateResolver implements ResolverInterface<Plate> {
  @Inject(() => PlateService)
  plateService: PlateService
  plateRepository: Repository<Plate>
  complaintRepository: Repository<Complaint>

  // QUERY ALL PLATES
  @Query(() => [Plate])
  async getAllPlates(): Promise<Plate[]> {
    return await this.plateService.findAll()
  }

  // QUERY A SPECIFIC PLATE BY PLATE_NUMBER
  @Query(() => Plate, { nullable: true })
  async findByPlateState(@Args() args: GetPlateArgs): Promise<Plate> {
    const plate = await this.plateService.findByPlateNumberAndState(args)
    if (plate === undefined) {
      throw new UserInputError(args.state + " " + args.plate_serial)
    }
    return plate
  }

  @FieldResolver()
  async complaints(@Root() plate: Plate) {
    // const allComplaintsAssociated = await this.complaintRepository.findByIds(plate.complaints.map((complaint) => {return complaint.id}))
    // return allComplaintsAssociated
    return plate.complaints
  }

  // CREATE A PLATE, MUST BE A USER?
  @Mutation(() => Plate)
  async createPlate(@Arg("data") data: CreatePlateInput): Promise<Plate> {
    return this.plateService.createPlate(data)
  }

  // // DELETE PLATE, MUST BE USER?
  // @Mutation(() => Boolean)
  // async destroyPlateNumber(
  //   @Arg("data") data: CreatePlateInput,
  // ): Promise<boolean> {
  //   return this.service.destroyPlate(data.plate_serial)
  // }
}
