import { Service } from "typedi"
import { Listing } from "../entities/listing.entity"
import { ListingInput } from "../inputs/listing.input"
import { UserInputError } from "apollo-server-express"
import { S3_URL } from "../../lib/config"

@Service()
export class ListingService {
  async findAll(): Promise<Listing[]> {
    return await Listing.find()
  }

  // returns the id
  async create(id: string, input: ListingInput): Promise<Listing> {
    const listing = await Listing.create(input)
    listing.authorId = id
    // todo: remove this prepend url, do it on client end by returning proper struct access url
    // if the imageUrl contains a value,
    // we prepend the url to it
    if (input.imageUrl) {
      listing.imageUrl = `${S3_URL}${input.imageUrl}`
    }
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
