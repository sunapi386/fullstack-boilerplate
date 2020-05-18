declare module "yup" {
  interface StringSchema {
    nullIfEmpty(): StringSchema
  }
  interface NumberSchema {
    nullIfEmpty(): NumberSchema
  }
}
