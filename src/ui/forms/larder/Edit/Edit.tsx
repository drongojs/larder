import React, { ReactNode } from 'react';
import { Form, Formik } from 'formik';
import Buttons from 'ui/modules/larder/edit/Buttons';
import { Flex, Child } from 'ui/elements/Flex';
import { Resource } from '@drongo/recess';
import { Stock } from 'domain/core';
import { formatQuantity } from 'domain/selectors';

interface Props {
  stockResource: Resource<Stock>,
  submitting: boolean,
  children?: ReactNode,
  onSubmit: (...args: any[]) => any,
}

export default function Edit({
  stockResource,
  submitting,
  onSubmit,
  children,
}: Props) {
  const { data: stock } = stockResource;

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
      <Flex
        direction="column"
        grow={true}
        as={Form}
      >
        <Child>
          {children}
        </Child>
        <Buttons
          id={stock.id}
          submitting={submitting}
        />
      </Flex>
    </Formik>
  );
}
