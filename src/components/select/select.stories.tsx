import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '.'

export default {
  title: 'components/Select',
  component: Select,
} as Meta<typeof Select>

export const Default: StoryObj<typeof Select> = {
  args: {
    label: 'Duration',
    options: [
      {
        id: 'days',
        children: 'Days',
      },
      {
        id: 'weeks',
        children: 'Weeks',
      },
      {
        id: 'months',
        children: 'Months',
      },
    ],
  },
}
