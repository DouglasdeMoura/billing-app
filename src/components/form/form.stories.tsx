import type { Meta } from '@storybook/react'

import { Button } from '../button/button'
import { TextField } from '../text-field'
import { Form } from './form'

const meta: Meta<typeof Form> = {
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Example = () => (
  <Form>
    <TextField label="Email" name="email" type="email" isRequired />
    <div className="flex gap-2">
      <Button type="submit">Submit</Button>
      <Button type="reset" variant="secondary">
        Reset
      </Button>
    </div>
  </Form>
)
