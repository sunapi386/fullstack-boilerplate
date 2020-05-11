import { User } from "../entities/user.entity"
import { ObjectType, Field } from "type-graphql"
import { Asset } from "../entities/asset.entity"

// returns unauthenticated user data
@ObjectType()
export class PublicUserResponse implements Partial<User> {
  @Field()
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field({nullable: true})
  avatar: Asset

  @Field({nullable: true})
  phone: string
}
