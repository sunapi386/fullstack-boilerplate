import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql"
import { Inject } from "typedi"

import { Plate } from "./plate.entity"
import { PlateService } from "./plate.service"
import { UserInputError } from "apollo-server-express"
import { GetPlateArgs } from "./inputs/getplate.args"

@Resolver(() => Plate)
export class PlateResolver {
  @Inject(() => PlateService)
  plateService: PlateService

  // QUERY ALL PLATES
  @Query(() => [Plate])
  async getPlates(): Promise<Plate[]> {
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

  // No need to explicitly create a plate because we'll just make the customer create a complaint first
  // and create the license plate by-the-way.

  @Authorized("ADMIN") // must be admin to delete plate
  @Mutation(() => Boolean)
  async deletePlateNumber(@Arg("id") id: string): Promise<boolean> {
    return this.plateService.destroyPlate(id)
  }
}
