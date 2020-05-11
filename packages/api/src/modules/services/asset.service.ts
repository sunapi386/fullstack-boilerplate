import { Service } from "typedi"

import { Asset } from "../entities/asset.entity"
import { UserInputError } from "apollo-server-express"

@Service()
export class AssetService {
  async checkAssetExists(field: Partial<Asset>) {
    const asset = await Asset.find({ where: field }) // todo: does this actually work
    if (asset.length > 0) {
      throw new UserInputError("A asset with these details already exists")
    }
  }
}
