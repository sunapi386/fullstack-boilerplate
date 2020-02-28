import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Inject } from "typedi"

import { Plate } from "./plate.entity"
import { PlateService } from "./plate.service"
import { UserInputError } from "apollo-server-express"
import { CreatePlateInput } from "./inputs/createplate.input"

@Resolver(() => Plate)
export class PlateResolver {
  @Inject(() => PlateService)
  PlateService: PlateService

  // QUERY ALL PLATES
  @Query(returns => [Plate])
  async getAllPlates() {
    return await this.PlateService.findAll()
  }

  // QUERY A SPECIFIC PLATE BY PLATE_NUMBER
  @Query(() => Plate, { nullable: true })
  async findByPlate(@Arg("data") data: CreatePlateInput) {
    const plate = await this.PlateService.findByPlateNumber(data)
    if (plate === undefined) {
      throw new UserInputError(data.state + " " + data.plate_serial)
    }
    return plate
  }

  // CREATE A PLATE, MUST BE A USER?
  @Mutation(() => Plate)
  async createPlate(@Arg("data") data: CreatePlateInput): Promise<Plate> {
    return this.PlateService.create(data)
  }

  // DELETE PLATE, MUST BE USER?
  @Mutation(() => Boolean)
  async destroyPlateNumber(
    @Arg("data") data: CreatePlateInput,
  ): Promise<boolean> {
    return this.PlateService.destroy(data.plate_serial)
  }
}
