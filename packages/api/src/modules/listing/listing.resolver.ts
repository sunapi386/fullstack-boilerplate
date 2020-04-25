import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql"
import { Inject } from "typedi"

import { Listing } from "./listing.entity"
import { ListingService } from "./listing.service"
import { CurrentUser } from "../shared/context/currentUser"
import { User } from "../user/user.entity"
import { CreateListingInput } from "./inputs/createlisting.input"
import { UserInputError } from "apollo-server-express"

@Resolver(() => Listing)
export class ListingResolver {
  @Inject(() => ListingService)
  listingService: ListingService

  // anyone can read listings collection
  @Query(() => [Listing])
  async getListing(): Promise<Listing[]> {
    return await this.listingService.findAll()
  }

  // anyone can read a specific Listing
  @Query(() => Listing)
  async findListing(@Arg("id") id: string): Promise<Listing> {
    const listing = await this.listingService.find(id)
    if (listing === undefined) {
      throw new UserInputError(id + " found no listings")
    }
    return listing
  }

  @Authorized() // only logged in users can add listings
  @Mutation(() => Listing, { nullable: true })
  async createListing(
    // @Ctx() { req }: ResolverContext,
    @CurrentUser() currentUser: User,
    @Arg("data") input: CreateListingInput,
  ): Promise<Listing> {
    return this.listingService.create(currentUser.id, input)
  }

  @Authorized("ADMIN") // only admin can delete stuff
  @Mutation(() => Boolean)
  async deleteListingNumber(@Arg("id") id: string): Promise<boolean> {
    return this.listingService.destroy(id)
  }
}
