import { Resolver } from "type-graphql"
import { Inject } from "typedi"

import { Listing } from "./listing.entity"
import { ListingService } from "./listing.service"

@Resolver(() => Listing)
export class ListingResolver {
  @Inject(() => ListingService)
  listingService: ListingService
}
