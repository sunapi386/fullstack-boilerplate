import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql"
import { Inject } from "typedi"

import { Listing } from "./listing.entity"
import { ListingService } from "./listing.service"
import { CurrentUser } from "../shared/context/currentUser"
import { User } from "../user/user.entity"
import { CreateListingInput } from "./inputs/createlisting.input"
import { UserInputError } from "apollo-server-express"
import { UserRepository } from "../user/user.repository"

@Resolver(() => Listing)
export class ListingResolver implements ResolverInterface<Listing> {
  @Inject(() => ListingService)
  listingService: ListingService
  @Inject(() => UserRepository)
  private userRepository: UserRepository

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

  @FieldResolver()
  async author(@Root() listing: Listing): Promise<User> {
    const user = await this.userRepository.findById(listing.authorId, {
      cache: 1000,
    })
    if (!user)
      throw new UserInputError("Cannot find authorId " + listing.authorId)
    return user
  }
}
