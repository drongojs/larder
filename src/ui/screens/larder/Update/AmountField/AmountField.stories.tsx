import React from 'react';
import { Formik, Form } from 'formik';
import AmountField from './AmountField';

export default {
  title: 'screens/larder/Update/AmountField',
  component: AmountField,
  decorators: [
    (Story: any) => (
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <Story/>
        </Form>
      </Formik>
    ),
  ],
};

export const basic = () => {
  return (
    <AmountField
      baseUnit="g"
      unit=""
      negate={false}
      quantity={500}
      submitting={false}
      onNegateClick={() => {}}
    />
  );
};

export const submitting = () => {
  return (
    <AmountField
      baseUnit="g"
      unit=""
      negate={false}
      quantity={500}
      submitting={true}
      onNegateClick={() => {}}
    />
  );
};

export const negative = () => {
  return (
    <AmountField
      baseUnit="g"
      unit=""
      negate={true}
      quantity={500}
      submitting={false}
      onNegateClick={() => {}}
    />
  );
};

export const customUnit = () => {
  return (
    <AmountField
      baseUnit="g"
      unit="kg"
      negate={false}
      quantity={500}
      submitting={false}
      onNegateClick={() => {}}
    />
  );
};
