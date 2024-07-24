import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { NumberField } from '.'

describe('NumberField', () => {
  it('should render the component', async () => {
    render(<NumberField label="Amount" isRequired />)

    const element = screen.getByLabelText('Amount')

    expect(element).toBeInTheDocument()
  })
})
