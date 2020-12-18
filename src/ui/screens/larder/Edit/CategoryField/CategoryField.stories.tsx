import React, { Suspense, useRef } from 'react';
import { Formik, Form } from 'formik';
import CategoryField from './CategoryField';
import { useQuery } from '@respite/query';

export default {
  title: 'screens/larder/Edit/CategoryField',
  component: CategoryField,
  decorators: [
    (Story: any) => (
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <Suspense fallback={<div>Loading</div>}>
            <Story/>
          </Suspense>
        </Form>
      </Formik>
    ),
  ],
};

export const basic = () => {
  const ref = useRef([
    {
      id: 'frozen',
      name: 'Frozen',
    },
    {
      id: 'tinned',
      name: 'Tinned',
    },
  ]);
  const query = useQuery(() => ref.current, [ 'categories' ]);
  const onCreate = async(name: string) => {
    const c = {
      id: name,
      name,
    };
    ref.current.push(c);
    return c;
  };
  return (
    <CategoryField
      query={query}
      onCreate={onCreate}
    />
  );
};
