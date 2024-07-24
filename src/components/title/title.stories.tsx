import type { Meta, StoryObj } from '@storybook/react'

import { Title } from '.'

export default {
  title: 'components/Title',
  component: Title,
} as Meta<typeof Title>

export const Default: StoryObj<typeof Title> = {
  args: {
    children: 'Setup your subscription',
  },
}
