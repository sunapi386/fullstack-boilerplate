import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { User } from "../entities/user.entity"
import { Asset } from "../entities/asset.entity"

@InputType()
export class UpdateUserInput implements Partial<User> {
  @IsNotEmpty()
  @Field({ nullable: true })
  firstName?: string

  @IsNotEmpty()
  @Field({ nullable: true })
  lastName?: string

  @IsNotEmpty()
  @Field({ nullable: true })
  email?: string

  @IsNotEmpty()
  @Field({ nullable: true })
  password?: string

  @IsNotEmpty()
  @Field({ nullable: true })
  avatarUrl?: string

  // id can be provided if the asset was already created
  @IsNotEmpty()
  @Field({ nullable: true })
  avatarAssetId?: string
}
