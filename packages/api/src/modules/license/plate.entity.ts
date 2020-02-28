import { Entity } from "typeorm"
import { ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"

@ObjectType()
@Entity()
export class Plate extends BaseEntity<Plate> {
  @StringField({ unique: true })
  plate_serial: string

  @StringField()
  state: string

  // Plate can have multiple Complaints; many-to-many
}
