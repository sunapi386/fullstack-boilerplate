import { User } from "./user.entity"
import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class AuthResponse {
  @Field()
  user: User

  @Field()
  token: string
}
