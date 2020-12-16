import React, { useState } from 'react';
import { useFormikContext, useField, Formik, Form } from 'formik';
import { Option, Select, AddOption } from './';

export default {
  title: 'elements/Select',
};

export const basic = () => {
  const [ value, setValue ] = useState('');

  return (
    <div>
      <Select
        value={value}
        onChange={setValue}
      >
        <Option value="apples">Apples</Option>
        <Option value="bananas">Bananas</Option>
        <Option value="carrots">Carrots</Option>
        <Option value="dates">Dates</Option>
      </Select>
      <div>{value}</div>
    </div>
  );
};

export const complex = () => {
  const [ value, setValue ] = useState();
  const options = [
    {
      id: 'apples',
      value: 'Apples',
    },
    {
      id: 'bananas',
      value: 'Bananas',
    },
    {
      id: 'carrots',
      value: 'Carrots',
    },
    {
      id: 'dates',
      value: 'Dates',
    },
  ];

  return (
    <div>
      <Select
        value={value}
        onChange={setValue}
        getText={option => option.value}
      >
        {options.map(option => (
          <Option key={option.id} value={option} search={option.value.toLowerCase()}>
            {option.value}
          </Option>
        ))}
      </Select>
      <div>
        <pre>
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export const flow = () => {
  const [ value, setValue ] = useState('');

  return (
    <div>
      <input/>
      <Select
        value={value}
        onChange={setValue}
      >
        <Option value="apples">apples</Option>
        <Option value="bananas">bananas</Option>
      </Select>
      <input/>
      <div>{value}</div>
    </div>
  );
};

export const addable = () => {
  const [ options, setOptions ] = useState([
    'apples',
    'bananas',
    'carrots',
    'dates',
  ]);
  const [ value, setValue ] = useState('bananas');

  return (
    <div>
      <Select
        value={value}
        onChange={setValue}
      >
        {options.map(option => (
          <Option key={option} value={option}>{option}</Option>
        ))}
        <AddOption
          onClick={search => {
            setOptions([ ...options, search ]);
            setValue(search);
          }}
          render={search => `Create new item ${search}`}
        />
      </Select>
      <div>{value}</div>
    </div>
  );
};

export const formik = () => {
  const Value = () => {
    const { values: { fruit } } = useFormikContext();

    return (<div>{fruit}</div>);
  };

  const Field = () => {
    const [ input, , { setValue } ] = useField({
      name: 'fruit',
    });


    return (
      <Select
        {...input}
        onChange={setValue}
      >
        <Option value="apples">Apples</Option>
        <Option value="bananas">Bananas</Option>
        <Option value="carrots">Carrots</Option>
        <Option value="dates">Dates</Option>
      </Select>
    );
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={() => {}}
    >
      <Form>
        <div>
          <Field/>
          <Value/>
        </div>
      </Form>
    </Formik>
  );
};
