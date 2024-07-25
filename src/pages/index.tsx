import { useSearchParams } from 'react-router-dom'

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

type ControlledFieldProps = {
  label?: string
  'aria-label'?: string
  name: string
  options?: { id: string; children: string }[]
  type?: 'number' | 'text'
}

const ControlledField: React.FC<ControlledFieldProps> = ({
  label,
  name,
  type,
  'aria-label': ariaLabel,
  options,
}) => {
  const [searchParams, setSearchParam] = useSearchParams()

  const handleChange = (value: string | number) => {
    // @ts-expect-error - TS is infering the wrong type for the state
    setSearchParam((state) => {
      const object = Object.fromEntries(state)

      if (!value) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: _, ...rest } = object
        return rest
      }

      return { ...object, [name]: value }
    })
  }

  if (type === 'number') {
    const value = searchParams.get(name) ? +searchParams.get(name)! : undefined

    return (
      <NumberField
        aria-label={ariaLabel}
        label={label}
        name={name}
        defaultValue={value}
        onChange={handleChange}
        minValue={0}
      />
    )
  }

  const value = searchParams.get(name) ? searchParams.get(name)! : undefined

  if (options) {
    return (
      <Select
        aria-label={ariaLabel}
        options={options}
        name={name}
        defaultSelectedKey={value}
        onSelectionChange={handleChange}
      />
    )
  }

  return (
    <TextField
      aria-label={ariaLabel}
      label={label}
      name={name}
      defaultValue={value}
      onChange={handleChange}
    />
  )
}

export const App: React.FC = () => {
  return (
    <section className="m-auto container p-4">
      <header className="mb-8">
        <Title className="text-center">Setup your subscription</Title>
      </header>
      <Form>
        <Line>
          <ControlledField
            label="Initial Price"
            name="initialPrice"
            type="number"
          />

          <TwoInputs>
            <ControlledField
              label="Billing frequency"
              name="billingFrequency"
              type="number"
            />
            <ControlledField
              aria-label="Select the billing frequency"
              options={[{ id: 'months', children: 'Months' }]}
              name="frequency"
            />
          </TwoInputs>

          <TextField label="Monthly payment" />
        </Line>

        <Line>
          <TwoInputs>
            <ControlledField
              label="Trial period"
              name="trialPeriod"
              type="number"
            />
            <ControlledField
              aria-label="Select the trial period"
              options={[
                { id: 'days', children: 'Days' },
                { id: 'weeks', children: 'Weeks' },
              ]}
              name="period"
            />
          </TwoInputs>

          <ControlledField label="Duration" name="duration" />

          <ControlledField label="Billing Cycles" name="billingCycles" />
        </Line>
      </Form>
      <div>Your customer will be charged</div>
    </section>
  )
}
