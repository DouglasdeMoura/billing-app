import { Form } from '~/components/form'
import { NumberField } from '~/components/number-field'
import { Select } from '~/components/select'
import { TextField } from '~/components/text-field'
import { Title } from '~/components/title'

const Line: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
)

const TwoInputs: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="grid grid-cols-2 gap-2 items-end">{children}</div>
}

export const App: React.FC = () => {
  return (
    <section className="m-auto container p-4">
      <header className="mb-8">
        <Title className="text-center">Setup your subscription</Title>
      </header>
      <Form>
        <Line>
          <TextField label="Initial Price" />

          <TwoInputs>
            <NumberField label="Billing frequency" />
            <Select options={[{ id: 'months', children: 'Months' }]} />
          </TwoInputs>

          <TextField label="Monthly payment" />
        </Line>

        <Line>
          <TwoInputs>
            <NumberField label="Trial period" />
            <Select
              options={[
                { id: 'days', children: 'days' },
                { id: 'weeks', children: 'Weeks' },
              ]}
            />
          </TwoInputs>

          <TextField label="Duration" />

          <TextField label="Billing Cycles" />
        </Line>
      </Form>
      <div>Your customer will be charged</div>
    </section>
  )
}
