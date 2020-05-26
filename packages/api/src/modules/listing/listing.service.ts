import { Service } from "typedi"
import { Listing } from "./listing.entity"
import { CreateListingInput } from "./input/createListing.input"
import { UserInputError } from "apollo-server-express"
import { UpdateListingInput } from "./input/updateListing.input"

@Service()
export class ListingService {
  async findById(listingId: string): Promise<Listing> {
    const listing = await Listing.findOne(listingId)
    if (!listing) throw new Error("listing not found")
    return listing
  }

  async findAll(): Promise<Listing[]> {
    return await Listing.find()
  }

  // returns the id
  async create(input: CreateListingInput, authorId: string): Promise<Listing> {
    return new Promise(async (resolve, reject) => {
      try {
        const listing = await Listing.create({ ...input, authorId })
        await listing.save()
        resolve(listing)
      } catch (error) {
        reject(error)
      }
    })
  }

  async destroy(id: string): Promise<boolean> {
    const user = await this.find(id)
    return user.destroy()
  }

  async find(id: string) {
    try {
      return await Listing.findOneOrFail({
        where: { id: id },
      })
    } catch {
      throw new UserInputError("Listing not found")
    }
  }

  update(listingId: string, data: UpdateListingInput): Promise<Listing> {
    return new Promise(async (resolve, reject) => {
      try {
        const listing = await this.findById(listingId)
        if (!listing) throw new Error("listing not found")
        Object.assign(listing, data)
        await listing.save()
        resolve(listing)
      } catch (error) {
        reject(error)
      }
    })
  }
}
