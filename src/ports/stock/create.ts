import { Jpex } from 'jpex';
import { Stock, Create } from 'domain/core/stock';
import { Driver } from 'domain/core/driver';

export const makeCreate = (driver: Driver): Create => data => {
  return driver<Stock>({
    url: '/api/stock/items',
    method: 'POST',
    data,
  });
};

export default (jpex: Jpex) => {
  return jpex.factory<Create>(makeCreate);
};
