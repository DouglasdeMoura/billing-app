import { Heading, type HeadingProps } from 'react-aria-components'

type TitleProps = {
  children?: React.ReactNode
} & HeadingProps

export const Title: React.FC<TitleProps> = ({ children, ...props }) => (
  <Heading
    {...props}
    slot="title"
    className={`text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 ${props?.className ? props.className : ''}`}
  >
    {children}
  </Heading>
)
