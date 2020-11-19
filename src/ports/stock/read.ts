import { Jpex } from 'jpex';
import { Stock, Read } from 'domain/core/stock';
import { Driver } from 'domain/core/driver';

export const makeRead = (driver: Driver): Read => ({ id }) => {
  return driver<Stock>({
    url: '/api/stock/item/:id',
    params: { id },
  });
};

export default (jpex: Jpex) => {
  return jpex.factory<Read>(makeRead);
};
