import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from 'react-aria-components'

import { composeTailwindRenderProps, focusRing } from '~/utils/styles'

import {
  Description,
  FieldError,
  Input,
  Label,
  fieldBorderStyles,
} from '~/components/field'
import { tv } from 'tailwind-variants'

const inputStyles = tv({
  extend: focusRing,
  base: 'border-2 rounded-md',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
})

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function TextField({
  label,
  description,
  errorMessage,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'flex flex-col gap-1',
      )}
    >
      {label && <Label>{label}</Label>}
      <Input className={inputStyles} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  )
}