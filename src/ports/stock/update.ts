import { Jpex } from 'jpex';
import { Stock, Update } from 'domain/core/stock';
import { Driver } from 'domain/core/driver';

export const makeUpdate = (driver: Driver): Update => ({
  id,
  ...data
}) => {
  return driver<Stock>({
    url: '/api/stock/item/:id',
    params: { id },
    method: 'PATCH',
    data,
  });
};

export default (jpex: Jpex) => {
  return jpex.factory<Update>(makeUpdate);
};
