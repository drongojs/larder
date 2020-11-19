import { Jpex } from 'jpex';
import { Delete } from 'domain/core/stock';
import { Driver } from 'domain/core/driver';

export const makeDelete = (driver: Driver): Delete => ({ id }) => {
  return driver({
    url: '/api/stock/item/:id',
    params: { id },
    method: 'DELETE',
  });
};

export default (jpex: Jpex) => {
  return jpex.factory<Delete>(makeDelete);
};
