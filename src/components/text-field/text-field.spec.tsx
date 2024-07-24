import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TextField } from '.'

describe('Select', () => {
  it('should render the component', async () => {
    render(
      <TextField
        label="E-mail"
        errorMessage="Type a valid e-mail"
        type="email"
        isRequired
      />,
    )

    const element = screen.getByLabelText('E-mail')

    expect(element).toBeInTheDocument()
  })
})
