import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { App } from './app'

describe('<App />', () => {
  it('the initial component', async () => {
    render(<App />)

    expect(screen.getByRole('heading')).toHaveTextContent(
      'Setup your subscription',
    )
  })
})
