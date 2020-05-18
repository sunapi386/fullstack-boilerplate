import { Resolver, Query, Mutation, Arg } from "type-graphql"
  
import { Address } from "./address.entity"
import { CreateAddressInput } from "./input/createAddress.input"
import { UpdateAddressInput } from "./input/updateAddress.input"
import { AddressService } from "./address.service"
import { AddressRepository } from "./address.repository"

@Resolver(() => Address)
export class AddressResolver {
  constructor(
    private readonly addressService: AddressService,
    private readonly addressRepository: AddressRepository
  ) {}

  @Query(() => [Address])
  getAddresses(): Promise<Address[]> {
    return this.addressRepository.findAll()
  }

  @Mutation(() => Address)
  createAddress(@Arg("data") data: CreateAddressInput): Promise<Address> {
    return this.addressService.create(data)
  }

  @Mutation(() => Address)
  updateAddress(
    @Arg("addressId") addressId: string,
    @Arg("data") data: UpdateAddressInput,
  ): Promise<Address> {
    return this.addressService.update(addressId, data)
  }

  @Mutation(() => Boolean)
  destroyAddress(@Arg("addressId") addressId: string): Promise<boolean> {
    return this.addressService.destroy(addressId)
  }

}
