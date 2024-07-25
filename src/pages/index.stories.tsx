import type { Meta, StoryObj } from '@storybook/react'

import { App } from '.'

export default {
  title: 'pages/App',
  component: App,
} as Meta<typeof App>

export const Default: StoryObj<typeof App> = {}
