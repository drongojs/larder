import React from 'react';
import { useField } from 'formik';
import Label from 'ui/elements/Label';
import TextInput from 'ui/elements/TextInput';

const AmountField = () => {
  const [ input ] = useField('amount');

  return (
    <div>
      <Label>
        Amount
        <TextInput {...input}/>
      </Label>
    </div>
  );
};

export default AmountField;
