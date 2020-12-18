import React, { ReactNode } from 'react';
import { Form, Formik } from 'formik';
import { Query } from '@respite/query';
import { Stock } from 'domain/core';
import { formatQuantity } from 'domain/selectors';

interface Props {
  stockQuery: Query<Stock>,
  children?: ReactNode,
  className?: string,
  onSubmit: (...args: any[]) => any,
}

export default function Edit({
  stockQuery,
  children,
  className,
  onSubmit,
}: Props) {
  const { data: stock } = stockQuery;

  const initialValues = {
    name: stock.name,
    amount: formatQuantity(stock.quantity, stock.unit, stock.unit),
    categoryId: stock.categoryId,
    image: stock.image,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <Form
        className={className}
      >
        {children}
      </Form>
    </Formik>
  );
}
