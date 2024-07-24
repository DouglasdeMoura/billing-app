import type { Meta, StoryObj } from '@storybook/react'

import { NumberField } from '.'

export default {
  title: 'components/NumberField',
  component: NumberField,
} as Meta<typeof NumberField>

export const Default: StoryObj<typeof NumberField> = {
  args: {
    label: 'Amount',
  },
}
