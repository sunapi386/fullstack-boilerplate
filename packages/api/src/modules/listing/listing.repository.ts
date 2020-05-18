import { Service } from "typedi"
import { Listing } from "./listing.entity"

@Service()
export class ListingRepository {
  findById(listingId: string): Promise<Listing> {
    return Listing.findOneOrFail(listingId)
  }

  findAll(): Promise<Listing[]> {
    return Listing.find()
  }
}
