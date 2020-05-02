import { InputType, Field } from "type-graphql"
import { User } from "../entities/user.entity"

@InputType()
export class ResetPasswordInput implements Partial<User> {
  @Field()
  password: string

  @Field()
  token: string
}
