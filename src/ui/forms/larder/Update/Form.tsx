import React from 'react';
import Update from './ConnectedUpdate';
import { Formik } from 'formik';
import { Resource } from '@drongo/recess';
import { Stock } from 'domain/core';

interface Props {
  resource: Resource<Stock>,
  submitting: boolean,
  onSubmit: (...args: any[]) => any,
}

const Form = ({
  resource,
  submitting,
  onSubmit,
}: Props) => (
  <Formik
    initialValues={{ amount: '' }}
    onSubmit={onSubmit}
  >
    <Update
      resource={resource}
      submitting={submitting}
    />
  </Formik>
);

export default Form;
