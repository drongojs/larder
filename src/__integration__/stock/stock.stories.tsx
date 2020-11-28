import React from 'react';
import { parseSearch } from 'domain/selectors';
import {
  getStock,
  setStock,
} from './state';

export default {
  title: 'larder/setup',
};

export const addToStock = () => {
  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');
  const {
    name,
    quantity,
    unit,
  } = parseSearch(search);

  const stock = getStock();

  stock.push({
    id: name.toLowerCase(),
    name,
    categoryId: '',
    quantity,
    unit,
    image: '',
  });

  setStock(stock);

  return (
    <pre>
      {JSON.stringify(stock, null, 2)}
    </pre>
  );
};
