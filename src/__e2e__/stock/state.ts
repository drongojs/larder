import { Stock } from 'domain/core';
import { Jpex } from 'jpex';
import { Search, Create, Read, Update } from 'domain/core/stock';

export const getStock = (): Stock[] => JSON.parse(sessionStorage.getItem('stock') || '[]');
export const setStock = (stock: Stock[]) => sessionStorage.setItem('stock', JSON.stringify(stock));

export default (jpex: Jpex) => {
  jpex.constant<Search>(() => {
    return Promise.resolve(getStock());
  });
  jpex.constant<Create>(args => {
    const stock = getStock();
    const item = {
      id: args.name.toLowerCase(),
      ...args,
    };
    stock.push(item as any);
    setStock(stock);
    return Promise.resolve(item as any);
  });
  jpex.constant<Read>(({ id }) => {
    const item = getStock().find(item => item.id === id);
    return Promise.resolve(item);
  });
  jpex.constant<Update>(({ id, ...args }) => {
    const stock = getStock();
    const item = stock.find(item => item.id === id);
    const i = stock.indexOf(item);
    stock[i] = {
      ...item,
      ...args,
    };
    setStock(stock);
    return Promise.resolve(stock[i]);
  });
};
