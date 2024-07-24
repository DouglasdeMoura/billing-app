import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '.'

import { Info } from 'lucide-react'

export default {
  title: 'components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Button>

export const Default: StoryObj<typeof Button> = {
  args: {
    children: 'Click me!',
  },
}

export const Secondary: StoryObj<typeof Button> = {
  args: {
    children: 'Click me!',
    variant: 'secondary',
  },
}

export const Destructive: StoryObj<typeof Button> = {
  args: {
    children: 'Click me!',
    variant: 'destructive',
  },
}

export const Icon: StoryObj<typeof Button> = {
  args: {
    children: <Info />,
    variant: 'icon',
  },
}
