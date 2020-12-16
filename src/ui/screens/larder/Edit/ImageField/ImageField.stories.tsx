import React from 'react';
import { Formik, Form } from 'formik';
import ImageField from './ImageField';

export default {
  title: 'screens/larder/Edit/ImageField',
  component: ImageField,
  decorators: [
    (Story: any) => (
      <Formik
        initialValues={{
          image: 'https://picsum.photos/id/488/300/300',
        }}
        onSubmit={() => {}}
      >
        <Form>
          <Story/>
        </Form>
      </Formik>
    ),
  ],
};

export const basic = () => {
  return (
    <ImageField/>
  );
};
