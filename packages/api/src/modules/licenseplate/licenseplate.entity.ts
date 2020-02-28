import { Entity } from "typeorm"
import { ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"

@ObjectType()
@Entity()
export class LicensePlate extends BaseEntity<LicensePlate> {
  @StringField({ unique: true })
  plate: string

  @StringField()
  state: string

  // LicensePlate can have multiple Complaints; many-to-many
}
