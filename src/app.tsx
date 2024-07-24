import { Form } from '~/components/form'
import { Select } from '~/components/select'
import { TextField } from '~/components/text-field'
import { Title } from '~/components/title'

export const App: React.FC = () => {
  return (
    <section className="m-auto max-w-screen-lg p-4">
      <header>
        <Title className="text-center">Setup your subscription</Title>
      </header>
      <Form>
        <TextField label="Initial Price" />

        <div className="flex">
          <TextField label="Billing frequency" />
          <Select options={[{ id: 'months', children: 'Months' }]} />
        </div>

        <TextField label="Monthly payment" />

        <div>
          <TextField label="Trial period" />
          <Select
            options={[
              { id: 'days', children: 'days' },
              { id: 'weeks', children: 'Weeks' },
            ]}
          />
        </div>

        <TextField label="Duration" />

        <TextField label="Billing Cycles" />
      </Form>
      <div>Your customer will be charged</div>
    </section>
  )
}
