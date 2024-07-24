import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Description, FieldError, Input, Label } from '.'

describe('Description', () => {
  it('should render the component', () => {
    render(<Description>Default</Description>)

    const element = screen.getByText('Default')

    expect(element).toHaveClass('text-sm text-gray-600')
  })
})

describe('FieldError', () => {
  it('should render the component', () => {
    render(<FieldError>Field Error</FieldError>)
    const element = screen.getByText('Field Error')

    expect(element).toHaveClass('text-sm text-gray-600')
  })
})

describe('Input', () => {
  it('should render the component', () => {
    render(<Input />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})

describe('Label', () => {
  it('should render the component', () => {
    render(<Label>Label</Label>)

    const element = screen.getByText('Label')

    expect(element).toHaveClass(
      'text-sm text-gray-500 dark:text-zinc-400 font-medium cursor-default w-fit',
    )
  })
})
