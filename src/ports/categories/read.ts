import { Jpex } from 'jpex';
import { Category, Read } from 'domain/core/categories';
import { Driver } from 'domain/core/driver';

export const makeRead = (driver: Driver): Read => () => {
  return driver<Category[]>({
    url: '/api/categories',
  });
};

export default (jpex: Jpex) => {
  return jpex.factory<Read>(makeRead);
};
