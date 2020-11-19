import React from 'react';
import { Provider as JpexProvider } from 'react-jpex';
import ConnectedHome from '../ConnectedHome';
import { after } from 'crosscutting/utils';
import { Search, Create } from 'domain/core/stock';
import { Read as ReadCategories } from 'domain/core/categories';

export default {
  title: 'screens/larder/Home',
};

let stock = [
  {
    id: 'peas',
    categoryId: 'frozen',
    name: 'peas',
    quantity: 500,
    unit: 'g',
    image: 'http://lorempixel.com/100/100/food/',
  },
  {
    id: 'chips',
    categoryId: 'frozen',
    name: 'chips',
    quantity: 1,
    unit: 'kg',
    image: 'http://lorempixel.com/100/100/food/',
  },
];
const categories = [
  {
    id: 'frozen',
    name: 'Frozen',
  },
];

export const connected = () => {
  return (
    <JpexProvider
      onMount={(jpex) => {
        jpex.constant<Search>(async() => {
          await after(500);
          return stock;
        });
        jpex.constant<ReadCategories>(async() => {
          await after(500);
          return categories;
        });
        jpex.constant<Create>(async(args) => {
          await after(500);
          stock = [
            ...stock,
            {
              id: args.name,
              name: args.name,
              categoryId: '',
              image: 'http://lorempixel.com/100/100/food/',
              quantity: args.quantity ?? 1,
              unit: args.unit,
            },
          ];
          return stock[stock.length - 1];
        });
      }}
    >
      <ConnectedHome/>
    </JpexProvider>
  );
};
