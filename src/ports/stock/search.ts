import { Jpex } from 'jpex';
import { Stock, Search } from 'domain/core/stock';
import { Driver } from 'domain/core/driver';

export const makeSearch = (driver: Driver): Search => ({ search }) => {
  return driver<Stock[]>({
    url: '/api/stock/items',
    data: { q: search },
  });
};

export default (jpex: Jpex) => {
  return jpex.factory<Search>(makeSearch);
};
