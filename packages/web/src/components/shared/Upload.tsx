import React from "react"
import { FormControl, FormLabel } from "@chakra-ui/core"
import { Controller, FieldError, useFormContext } from "react-hook-form"
import { InputError } from "./InputError"
import { FilePond, FilePondProps } from "react-filepond"
// @types for the plugins don't exist yet
// import { FilePondPluginImagePreview } from 'filepond-plugin-image-preview'
// import { FilePondPluginImageExifOrientation } from 'filepond-plugin-image-exif-orientation';
import "filepond/dist/filepond.min.css"

interface Props extends FilePondProps {
  name: string
  label: string
  isRequired?: boolean
}

// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export const Upload = ({ label, ...props }: Props) => {
  const { errors, control } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string
  return (
    <FormControl isInvalid={!!fieldError} mb={4} isRequired={props.isRequired}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <Controller as={FilePond} control={control} {...props} />
      <InputError error={fieldError} />
    </FormControl>
  )
}
