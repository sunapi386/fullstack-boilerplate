import { Service } from "typedi"
import { Address } from "./address.entity"

@Service()
export class AddressRepository {
  findById(addressId: string): Promise<Address> {
    return Address.findOneOrFail(addressId)
  }

  findAll(): Promise<Address[]> {
    return Address.find()
  }
}
