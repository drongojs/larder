import React from 'react';
import { useField } from 'formik';
import Label from 'ui/elements/Label';
import TextInput from 'ui/elements/TextInput';

const NameField = () => {
  const [ input ] = useField('name');

  return (
    <div>
      <Label>
        Name
        <TextInput
          id="stock-name-input"
          {...input}
        />
      </Label>
    </div>
  );
};

export default NameField;
