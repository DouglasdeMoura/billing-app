import animate from 'tailwindcss-animate'
import reactAriaComponents from 'tailwindcss-react-aria-components'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [reactAriaComponents(), animate],
}
