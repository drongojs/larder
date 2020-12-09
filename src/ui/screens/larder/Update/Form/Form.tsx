import React from 'react';
import Update from './ConnectedUpdateForm';
import { Formik } from 'formik';
import { Query } from '@drongo/respite';
import { Stock } from 'domain/core';

interface Props {
  query: Query<Stock>,
  submitting: boolean,
  onSubmit: (...args: any[]) => any,
}

const Form = ({
  query,
  submitting,
  onSubmit,
}: Props) => (
  <Formik
    initialValues={{ amount: '' }}
    onSubmit={onSubmit}
  >
    <Update
      query={query}
      submitting={submitting}
    />
  </Formik>
);

export default Form;
