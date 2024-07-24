import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Title } from '.'

describe('Title', () => {
  it('should render the component', () => {
    render(<Title>Hi!</Title>)

    const element = screen.getByRole('heading')

    expect(element).toHaveTextContent('Hi!')
    expect(element).toHaveClass(
      'text-xl font-semibold leading-6 my-0 dark:text-white',
    )
    expect(element).toHaveAttribute('slot', 'title')
  })
})
