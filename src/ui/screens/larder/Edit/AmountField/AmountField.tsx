import React from 'react';
import { useField } from 'formik';
import Label from 'ui/elements/Label';
import TextInput from 'ui/elements/TextInput';

const AmountField = () => {
  const [ input ] = useField('amount');

  return (
    <div>
      <Label htmlFor="stock-amount-input">
        Amount
      </Label>
      <TextInput
        id="stock-amount-input"
        {...input}
      />
    </div>
  );
};

export default AmountField;
