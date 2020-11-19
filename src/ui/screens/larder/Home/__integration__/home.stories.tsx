import React from 'react';
import { Search, Create } from 'domain/core/stock';
import { Read as ReadCategories } from 'domain/core/categories';
import Home from '..';
import Provider from '__integration__/Provider';

export default {
  title: 'routes',
};

export const larder = () => {
  let stock = JSON.parse(sessionStorage.getItem('stock') || '[]');
  let categories = JSON.parse(sessionStorage.getItem('categories') || '[]');

  return (
    <Provider
      url="/larder"
      inject={(jpex) => {
        jpex.constant<Search>(() => {
          return Promise.resolve(stock);
        });
        jpex.constant<Create>((args) => new Promise((res) => {
          stock = [
            ...stock,
            {
              id: `${Math.random() * 1024}`,
              ...args,
            },
          ];
          res();
        }));
        jpex.constant<ReadCategories>(() => Promise.resolve(categories));
      }}
    >
      <Home/>
    </Provider>
  );
};
