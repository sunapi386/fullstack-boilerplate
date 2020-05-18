import { Service } from "typedi"
import { Asset } from "./asset.entity"

@Service()
export class AssetRepository {
  findById(assetId: string): Promise<Asset> {
    return Asset.findOneOrFail(assetId)
  }

  findAll(): Promise<Asset[]> {
    return Asset.find()
  }
}
