import { MaxLength, MinLength } from "class-validator"
import { Field } from "type-graphql"
import { Column } from "typeorm"

import { composeMethodDecorators, MethodDecoratorFactory } from "./utils"

interface StringFieldOptions {
  maxLength?: number
  minLength?: number
  nullable?: boolean
  unique?: boolean
  default?: string
  graphql?: boolean
  array?: boolean
}

export function StringField(args: StringFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}
  const maxLenOption = args.maxLength ? { length: args.maxLength } : {}
  const uniqueOption = args.unique ? { unique: true } : {}
  const defaultOption = args.default ? { default: args.default } : {}
  const arrayOption = args.array ? { array: args.array } : {}

  const factories = []
  if (args.graphql !== false) {
    factories.push(
      Field(() => String, {
        ...nullableOption,
        ...arrayOption,
      }),
    )
  }
  factories.push(
    Column({
      type: "character varying",
      ...maxLenOption,
      ...nullableOption,
      ...uniqueOption,
      ...defaultOption,
      ...arrayOption,
    }) as MethodDecoratorFactory,
  )

  if (args.minLength) {
    factories.push(MinLength(args.minLength))
  }
  if (args.maxLength) {
    factories.push(MaxLength(args.maxLength))
  }

  return composeMethodDecorators(...factories)
}
