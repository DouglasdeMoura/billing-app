import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '.'

export default {
  title: 'components/TextField',
  component: TextField,
} as Meta<typeof TextField>

export const Default: StoryObj<typeof TextField> = {
  args: {
    label: 'Email',
    type: 'email',
    errorMessage: 'Please enter a valid email address',
  },
}
