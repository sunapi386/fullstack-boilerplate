import { Service } from "typedi"
import { Listing } from "./listing.entity"
import { CreateListingInput } from "./inputs/createlisting.input"
import { UserInputError } from "apollo-server-express"

@Service()
export class ListingService {
  async findAll(): Promise<Listing[]> {
    return await Listing.find()
  }

  // returns the id
  async create(id: string, input: CreateListingInput): Promise<Listing> {
    const listing = await Listing.create(input)
    listing.authorId = id
    await listing.save()
    return listing
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
}
