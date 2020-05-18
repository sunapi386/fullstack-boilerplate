import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql"
import { Inject } from "typedi"

import { Asset } from "./asset.entity"
import { AssetService } from "./asset.service"
import { CurrentUser } from "../shared/context/currentUser"
import { User } from "../user/user.entity"

@Resolver(() => Asset)
export class AssetResolver {
  @Inject(() => AssetService)
  assetService: AssetService

  // shouldn't need to get all the assets...
  // @Query(() => [Asset])
  // @Authorized()
  // async assets(
  // ): Promise<Asset[]> {
  //   return await this.assetService.findAll()
  // }

  @Query(() => Asset)
  @Authorized()
  async getAssets(
    @Arg("id") id: string
  ): Promise<Asset> {
    return await Asset.findOneOrFail(id)
  }

  // must be owner to delete asset
  @Authorized()
  @Mutation(() => Boolean)
  async deleteAssetNumber(
    @CurrentUser() currentUser: User,
    @Arg("id") id: string): Promise<boolean> {
    const asset = await Asset.findOneOrFail(id)
    if (asset.authorId !== currentUser.id) {
      // not authorized
      console.log(`${currentUser.id} not authorized to delete asset ${asset.id} owned by ${asset.authorId}`)
      return false
    }
    // todo: also remove it from s3
    return asset.destroy()
  }
}
