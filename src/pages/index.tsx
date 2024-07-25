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

const formatPrice = (value: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(value)
}

type ControlledFieldProps = {
  label?: string
  'aria-label'?: string
  name: string
  options?: { id: string; children: string }[]
  type?: 'number' | 'text' | 'currency'
  disabled?: boolean
  required?: boolean
  defaultValue?: string | number
}

const ControlledField: React.FC<ControlledFieldProps> = ({
  label,
  name,
  type,
  'aria-label': ariaLabel,
  options,
  disabled,
  required,
  defaultValue,
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

  if (type === 'number' || type === 'currency') {
    const value = searchParams.get(name) ? +searchParams.get(name)! : undefined

    return (
      <NumberField
        aria-label={ariaLabel}
        label={label}
        name={name}
        defaultValue={value ?? (defaultValue as unknown as number)}
        onChange={handleChange}
        minValue={0}
        isDisabled={disabled}
        isRequired={required}
        formatOptions={
          type === 'currency'
            ? {
                style: 'currency',
                currency: 'USD',
                currencySign: 'accounting',
              }
            : undefined
        }
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
        defaultSelectedKey={value ?? defaultValue}
        onSelectionChange={handleChange}
        isDisabled={disabled}
        isRequired={required}
      />
    )
  }

  return (
    <TextField
      aria-label={ariaLabel}
      label={label}
      name={name}
      defaultValue={value ?? (defaultValue as unknown as string)}
      onChange={handleChange}
      isDisabled={disabled}
      isRequired={required}
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
  const trialPeriod = searchParams.get('trialPeriod')
    ? +searchParams.get('trialPeriod')!
    : null
  const period = searchParams.get('period') || ''
  const formattedTrialPeriod = trialPeriod
    ? trialPeriod > 1
      ? `${trialPeriod} ${searchParams.get('period')?.toLowerCase()}`
      : `${trialPeriod} ${searchParams
          .get('period')
          ?.slice(0, period.length - 1)
          ?.toLowerCase()}`
    : null

  return (
    <section className="m-auto container p-4 flex flex-col gap-4">
      <header className="mb-4">
        <Title className="text-center">Setup your subscription</Title>
      </header>
      <Form>
        <Line>
          <ControlledField
            label="Initial Price"
            name="initialPrice"
            type="currency"
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
            type="currency"
          />
        </Line>

        <Line>
          <TwoInputs>
            <ControlledField
              label="Trial period"
              name="trialPeriod"
              type="number"
              disabled={searchParams.get('period') === 'none'}
              required
            />
            <ControlledField
              aria-label="Select the trial period"
              options={[
                { id: 'none', children: 'None' },
                { id: 'days', children: 'Days' },
                { id: 'weeks', children: 'Weeks' },
                { id: 'months', children: 'Months' },
              ]}
              defaultValue={searchParams.get('period') || 'none'}
              name="period"
              required
            />
          </TwoInputs>

          <ControlledField
            label="Duration"
            name="duration"
            options={[
              { id: 'neverEnds', children: 'Never ends' },
              { id: 'customize', children: 'Customize' },
            ]}
            defaultValue="neverEnds"
            required
          />

          {searchParams.get('duration') &&
          searchParams.get('duration') !== 'neverEnds' ? (
            <ControlledField
              label="Billing Cycles"
              name="billingCycles"
              type="number"
            />
          ) : null}
        </Line>
      </Form>
      <div className="p-4 border border-slate-200 rounded-lg dark:text-slate-200 mt-4">
        {searchParams.get('initialPrice') ? (
          <>
            Your customer will be charged{' '}
            {formatPrice(+searchParams.get('initialPrice')!)} immediately
          </>
        ) : null}
        {searchParams.get('trialPeriod') &&
        searchParams.get('period') &&
        searchParams.get('period') !== 'none' ? (
          <> for their {formattedTrialPeriod} trial period</>
        ) : null}
        .
      </div>
    </section>
  )
}
