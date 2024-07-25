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
  disabled?: boolean
}

const ControlledField: React.FC<ControlledFieldProps> = ({
  label,
  name,
  type,
  'aria-label': ariaLabel,
  options,
  disabled,
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
        isDisabled={disabled}
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
        isDisabled={disabled}
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
      isDisabled={disabled}
    />
  )
}

export const App: React.FC = () => {
  const [searchParams] = useSearchParams()

  const getPaymentFrequency = () => {
    const options = {
      days: 'Daily',
      weeks: 'Weekly',
      months: 'Monthly',
    }

    const frequency = searchParams.get('frequency') || ''

    if (frequency in options) {
      return options[frequency as keyof typeof options]
    }

    return ''
  }

  const paymentFrequencyLabel = getPaymentFrequency()

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
              options={[
                { id: 'days', children: 'Days' },
                { id: 'weeks', children: 'Weeks' },
                { id: 'months', children: 'Months' },
              ]}
              name="frequency"
            />
          </TwoInputs>

          <ControlledField
            label={
              paymentFrequencyLabel
                ? `${paymentFrequencyLabel} payment`
                : 'Payment'
            }
            name="paymentFrequency"
            disabled={!paymentFrequencyLabel}
          />
        </Line>

        <Line>
          <TwoInputs>
            <ControlledField
              label="Trial period"
              name="trialPeriod"
              type="number"
              disabled={searchParams.get('period') === 'none'}
            />
            <ControlledField
              aria-label="Select the trial period"
              options={[
                { id: 'none', children: 'None' },
                { id: 'days', children: 'Days' },
                { id: 'weeks', children: 'Weeks' },
                { id: 'months', children: 'Months' },
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
