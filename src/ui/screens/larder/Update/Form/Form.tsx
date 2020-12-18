import React from 'react';
import Update from './ConnectedUpdateForm';
import { Formik } from 'formik';
import { Query } from '@respite/query';
import { Stock } from 'domain/core';

interface Props {
  query: Query<Stock>,
  submitting: boolean,
  error: any,
  onSubmit: (...args: any[]) => any,
}

const Form = ({
  query,
  submitting,
  error,
  onSubmit,
}: Props) => (
  <Formik
    initialValues={{ amount: '' }}
    onSubmit={onSubmit}
  >
    <Update
      error={error}
      query={query}
      submitting={submitting}
    />
  </Formik>
);

export default Form;
