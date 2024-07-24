import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Button } from '.'

import { Info } from 'lucide-react'

describe('Button', () => {
  it('should render the component in default state', () => {
    render(<Button>Default</Button>)

    const element = screen.getByRole('button', { name: 'Default' })

    expect(element).toHaveClass(
      'px-5 py-2 text-sm text-center transition rounded-lg border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none cursor-default bg-blue-600 hover:bg-blue-700 pressed:bg-blue-800 text-white',
    )
  })

  it('should render the component in secondary state', () => {
    render(<Button variant="secondary">Secondary</Button>)

    const element = screen.getByRole('button', { name: 'Secondary' })
    expect(element).toHaveClass(
      'px-5 py-2 text-sm text-center transition rounded-lg border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none cursor-default bg-gray-100 hover:bg-gray-200 pressed:bg-gray-300 text-gray-800 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:pressed:bg-zinc-400 dark:text-zinc-100',
    )
  })

  it('should render the component in destructive state', () => {
    render(<Button variant="destructive">Destructive</Button>)

    const element = screen.getByRole('button', { name: 'Destructive' })
    expect(element).toHaveClass(
      'px-5 py-2 text-sm text-center transition rounded-lg border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none cursor-default bg-red-700 hover:bg-red-800 pressed:bg-red-900 text-white',
    )
  })

  it('should render the component in icon mode', () => {
    render(
      <Button variant="icon">
        <Info aria-label="Info" />
      </Button>,
    )

    const element = screen.getByRole('button', { name: 'Info' })
    expect(element).toHaveClass(
      'outline outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight] outline-offset-2 text-sm text-center transition rounded-lg border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none cursor-default border-0 p-1 flex items-center justify-center text-gray-600 hover:bg-black/[5%] pressed:bg-black/10 dark:text-zinc-400 dark:hover:bg-white/10 dark:pressed:bg-white/20 disabled:bg-transparent outline-0',
    )
  })
})
