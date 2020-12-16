import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import AmountField from './AmountField';

global['SKIP_ANIMATIONS'] = true;

const wrapper = ({ children }: any) => (
  <Formik
    initialValues={{
      amount: '',
      quantity: '',
    }}
    onSubmit={() => {}}
  >
    <Form>
      {children}
    </Form>
  </Formik>
);

it('renders the amount in a text field', async() => {
  render(
    <AmountField
      negate={false}
      baseUnit="g"
      unit={null}
      quantity={500}
      submitting={false}
      onNegateClick={() => {}}
    />,
    { wrapper },
  );

  await screen.findByRole('textbox');
});

it('shows the default unit', async() => {
  render(
    <AmountField
      negate={false}
      baseUnit="g"
      unit={null}
      quantity={500}
      submitting={false}
      onNegateClick={() => {}}
    />,
    { wrapper },
  );

  await screen.findByText('g');
});

describe('when I enter a valid unit', () => {
  it('hides the default unit', async() => {
    await act(async() => {
      render(
        <AmountField
          negate={false}
          baseUnit="g"
          unit="kg"
          quantity={500}
          submitting={false}
          onNegateClick={() => {}}
        />,
        { wrapper },
      );
    });

    expect(screen.queryAllByText('g')).toHaveLength(0);
  });
});

describe('when I click the negate button', () => {
  it('flips the negate toggle', async() => {
    const Wrapper = () => {
      const [ negate, setNegate ] = useState(false);

      return (
        <AmountField
          negate={negate}
          baseUnit="g"
          unit="kg"
          quantity={500}
          submitting={false}
          onNegateClick={() => setNegate(!negate)}
        />
      );
    };

    render(<Wrapper/>, { wrapper });

    const button = await screen.findByText('+');
    userEvent.click(button);

    await screen.findByText('-');
  });
});
