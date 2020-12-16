import React, { useState } from 'react';
import TextInput from './TextInput';
import { Suffix, Prefix } from './suffix';
import Button from 'ui/elements/Button';
import { Kind } from 'ui/theme';

export default {
  title: 'elements/TextInput',
  component: TextInput,
};

export const basic = props => {
  const [ value, setValue ] = useState('');
  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <>
      <TextInput
        value={value}
        onChange={handleChange}
        {...props}
      />
      <div>{value}</div>
    </>
  );
};
basic.args = {
  hasError: false,
  placeholder: 'Enter stuff here...',
};

export const withTextSuffix = () => {
  const [ value, setValue ] = useState('');
  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <TextInput
      value={value}
      onChange={handleChange}
      suffix={(
        <Suffix>
          <div>kg</div>
        </Suffix>
      )}
    />
  );
};

export const withTextPrefix = () => {
  const [ value, setValue ] = useState('');
  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <TextInput
      value={value}
      onChange={handleChange}
      prefix={(
        <Prefix>
          <div>kg</div>
        </Prefix>
      )}
    />
  );
};

export const withPrefixAndSuffix = props => {
  const [ value, setValue ] = useState('');
  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <TextInput
      value={value}
      onChange={handleChange}
      prefix={(
        <Prefix>
          <div>before</div>
        </Prefix>
      )}
      suffix={(
        <Suffix>
          <div>after</div>
        </Suffix>
      )}
      {...props}
    />
  );
};
withPrefixAndSuffix.args = {
  hasError: false,
};

export const withButton = () => {
  const [ value, setValue ] = useState('');
  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <TextInput
      value={value}
      onChange={handleChange}
      prefix={(
        <Button kind={Kind.CTA}>before</Button>
      )}
      suffix={(
        <Button kind={Kind.SECONDARY}>after</Button>
      )}
    />
  );
};
