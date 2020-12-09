import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { useQuery } from '@drongo/respite';

export default {
  title: 'screens/larder/Update/Header',
  component: Header,
};

export const basic = () => (
  <BrowserRouter>
    <Suspense fallback={<div/>}>
      <Header
        query={useQuery(() => ({
          id: 'peas',
          name: 'Peas',
          categoryId: '',
          image: 'http://lorempixel.com/300/300/food/1',
          quantity: 500,
          unit: 'g',
        }), [ 'stock' ])}
      />
    </Suspense>
  </BrowserRouter>
);
