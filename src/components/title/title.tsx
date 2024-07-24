import { Heading } from 'react-aria-components'

type TitleProps = {
  children?: React.ReactNode
}

export const Title: React.FC<TitleProps> = ({ children }) => (
  <Heading
    slot="title"
    className="text-xl font-semibold leading-6 my-0 dark:text-white"
  >
    {children}
  </Heading>
)
