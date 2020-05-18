import { User } from "./user.entity"
import { Field, ObjectType } from "type-graphql"

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
  avatarUrl: string

  @Field({nullable: true})
  phone: string
}
