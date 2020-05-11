import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { User } from "../entities/user.entity"

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
  avatarUrlId?: File
}
