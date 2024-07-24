import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Select } from '.'

describe('Select', () => {
  it('should render the component', () => {
    render(
      <Select
        label="Select an option"
        options={[
          { id: '1', children: 'Option 1' },
          { id: '2', children: 'Option 2' },
          { id: '3', children: 'Option 3' },
        ]}
      />,
    )

    const element = screen.getByRole('combobox')

    expect(element).toHaveTextContent('Select an option')
  })
})
