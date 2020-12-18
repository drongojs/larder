import React, { useState } from 'react';
import CategoryField from './CategoryField';
import { Category } from 'domain/core';
import { act, render, screen } from '@testing-library/react';
import { Form, Formik } from 'formik';
import { staticQuery } from '@respite/mocks';
import userEvent from '@testing-library/user-event';

const wrapper = ({ children }: any) => (
  <Formik
    initialValues={{ categoryId: '' }}
    onSubmit={() => {}}
  >
    <Form>
      {children}
    </Form>
  </Formik>
);

it('renders each category option', async() => {
  const categories: Category[] = [
    {
      id: 'frozen',
      name: 'Frozen',
    },
    {
      id: 'tinned',
      name: 'Tinned',
    },
  ];
  render(
    <CategoryField
      onCreate={(): any => {}}
      query={staticQuery({
        data: categories,
      })}
    />,
    { wrapper },
  );

  const input = await screen.findByRole('textbox');
  userEvent.click(input);

  await screen.findByText('Frozen');
  await screen.findByText('Tinned');
});

it('renders the add option', async() => {
  const categories: Category[] = [
    {
      id: 'frozen',
      name: 'Frozen',
    },
    {
      id: 'tinned',
      name: 'Tinned',
    },
  ];

  render(
    <CategoryField
      onCreate={(): any => {}}
      query={staticQuery({
        data: categories,
      })}
    />,
    { wrapper },
  );

  const input = await screen.getByRole('textbox');
  userEvent.type(input, 'example');

  await screen.findByText('create example');
});

describe('when clicking on the add option', () => {
  it('creates a new category and sets the value', async() => {
    const Wrapper = () => {
      const [ categories, setCategories ] = useState<Category[]>([
        {
          id: 'frozen',
          name: 'Frozen',
        },
        {
          id: 'tinned',
          name: 'Tinned',
        },
      ]);

      return (
        <CategoryField
          onCreate={async name => {
            const category = {
              id: name,
              name,
            };
            setCategories([ ...categories, category ]);
            return category;
          }}
          query={staticQuery({
            data: categories,
          })}
        />
      );
    };
  
    render(<Wrapper/>, { wrapper });
  
    const input = await screen.findByRole('textbox');
    userEvent.type(input, 'example');
  
    const item = await screen.findByText('create example');
    userEvent.click(item);

    await act(async() => {});

    await screen.findByDisplayValue('example');
  });
});
