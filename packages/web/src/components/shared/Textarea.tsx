import React from "react"
import { FormLabel, Textarea as CTextarea, FormControl } from "@chakra-ui/core"
import { useFormContext, FieldError } from "react-hook-form"
import { InputError } from "./InputError"
import { InputProps } from "@chakra-ui/core/dist/Input"

interface Props extends InputProps<HTMLTextAreaElement> {
  name: string
  label: string
}

export const Textarea = ({ label, ...props }: Props) => {
  const { register, errors } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string
  return (
    <FormControl isInvalid={!!fieldError} mb={4} isRequired={props.isRequired}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <CTextarea ref={register} mb={0} variant="filled" {...props} />
      <InputError error={fieldError} />
    </FormControl>
  )
}
