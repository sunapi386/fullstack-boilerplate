import { Service } from "typedi"

import { Address } from "./address.entity"
import { CreateAddressInput } from "./input/createAddress.input"
import { UpdateAddressInput } from "./input/updateAddress.input"
import { AddressRepository } from "./address.repository"

@Service()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async create(data: CreateAddressInput): Promise<Address> {
    const address = await Address.create(data).save()
    return address
  }

  async update(addressId: string, data: UpdateAddressInput): Promise<Address> {
    const address = await this.addressRepository.findById(addressId)
    Object.assign(address, data)
    await address.save()
    return address
  }

  async destroy(addressId: string): Promise<boolean> {
    const address = await this.addressRepository.findById(addressId)
    await address.remove()
    return true
  }
}
