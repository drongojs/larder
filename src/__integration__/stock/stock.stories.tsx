import React from 'react';
import { Stock } from 'domain/core';
import { parseSearch } from 'domain/selectors';

export default {
  title: 'larder/setup',
};

export const addToStock = () => {
  const stock: Stock[] = JSON.parse(sessionStorage.getItem('stock') || '[]');
  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');
  const {
    name,
    quantity,
    unit,
  } = parseSearch(search);

  stock.push({
    id: name.toLowerCase(),
    name,
    categoryId: '',
    quantity,
    unit,
    image: '',
  });
  sessionStorage.setItem('stock', JSON.stringify(stock));

  return (
    <pre>
      {JSON.stringify(stock, null, 2)}
    </pre>
  );
};
