import React from 'react';
import Edit from '../ConnectedEdit';
import { MemoryRouter } from 'react-router';
import { Provider as JpexProvider } from 'react-jpex';
import { Read, Update } from 'domain/core/stock';
import { Read as ReadCategories, Create as CreateCategory } from 'domain/core/categories';
import { after } from 'crosscutting/utils';

export default {
  title: 'screens/larder/Edit',
  component: Edit,
};

let stock = {
  id: 'peas',
  name: 'Peas',
  categoryId: 'frozen',
  image: 'http://lorempixel.com/300/300/food/',
  quantity: 500,
  unit: 'g',
};
let categories = [
  {
    id: 'frozen',
    name: 'Frozen',
  },
  {
    id: 'tinned',
    name: 'Tinned',
  },
];

export const basic = () => {
  return (
    <JpexProvider onMount={jpex => {
      jpex.constant<Read>(async() => {
        await after(500);
        return stock;
      });
      jpex.constant<ReadCategories>(async() => {
        await after(1000);
        return categories;
      });
      jpex.constant<Update>(async data => {
        await after(500);
        stock = {
          ...stock,
          ...data,
        };
        return stock;
      });
      jpex.constant<CreateCategory>(async({ name }) => {
        await after(500);
        categories = [
          ...categories,
          {
            id: name,
            name,
          },
        ];
        return categories[categories.length - 1];
      });
    }}>
      <MemoryRouter initialEntries={[ 'larder/peas/edit' ]}>
        <Edit/>
      </MemoryRouter>
    </JpexProvider>
  );
};
