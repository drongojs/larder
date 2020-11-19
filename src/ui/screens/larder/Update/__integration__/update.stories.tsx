import React from 'react';
import Update from '..';
import { Read, Update as IUpdate } from 'domain/core/stock';
import Provider from '__integration__/Provider';

export default {
  title: 'routes',
};

export const larder_peas = () => {
  let stock = JSON.parse(sessionStorage.getItem('stock') || '[]');

  return (
    <Provider
      url="/larder/peas"
      route="/larder/:id"
      inject={(jpex) => {
        jpex.constant<Read>(({ id }) => {
          return Promise.resolve(stock.find((stock) => stock.id === id));
        });
        jpex.constant<IUpdate>(() => {
          return Promise.resolve(void 0);
        });
      }}
    >
      <Update/>
    </Provider>
  );
};
