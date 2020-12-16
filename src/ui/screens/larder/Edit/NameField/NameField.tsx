import React from 'react';
import { useField } from 'formik';
import Label from 'ui/elements/Label';
import TextInput from 'ui/elements/TextInput';

const NameField = () => {
  const [ input ] = useField('name');

  return (
    <div>
      <Label htmlFor="stock-name-input">
        Name
      </Label>
      <TextInput
        id="stock-name-input"
        {...input}
      />
    </div>
  );
};

export default NameField;
