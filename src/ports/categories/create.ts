import { Jpex } from 'jpex';
import { Category, Create } from 'domain/core/categories';
import { Driver } from 'domain/core/driver';

export const makeCreate = (driver: Driver): Create => data => {
  return driver<Category>({
    url: '/api/categories',
    method: 'POST',
    data,
  });
};

export default (jpex: Jpex) => {
  return jpex.factory<Create>(makeCreate);
};
