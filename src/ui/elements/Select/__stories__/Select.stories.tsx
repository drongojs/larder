import React, { useState } from 'react';
import Select from '../Select';
import { after } from 'crosscutting/utils';
import { useFormikContext, useField, Formik, Form } from 'formik';

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
        options={[
          'apples',
          'bananas',
          'carrots',
          'dates',
        ]}
      />
      <div>{value}</div>
    </div>
  );
};

export const complex = () => {
  const [ value, setValue ] = useState();

  return (
    <div>
      <Select
        value={value}
        onChange={setValue}
        getKey={option => option.id}
        getText={option => option.value}
        options={[
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
        ]}
      />
      <div>
        <pre>
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export const customRender = () => {
  const [ value, setValue ] = useState();

  return (
    <div>
      <Select
        value={value}
        onChange={setValue}
        getKey={option => option.id}
        render={option => (
          <span style={{ color: 'red', fontWeight: 700 }}>
            {option.value}
          </span>
        )}
        options={[
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
        ]}
      />
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
        options={[
          'apples',
          'bananas',
          'carrots',
          'dates',
        ]}
      />
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
        options={options}
        onChange={setValue}
        onAdd={async(text: string) => {
          await after(250);
          setOptions([ ...options, text ]);
          setValue(text);
        }}
      />
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
        options={[
          'apples',
          'bananas',
          'carrots',
        ]}
        {...input}
        onChange={setValue}
      />
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
