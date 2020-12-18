import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { useQuery } from '@respite/query';

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
          image: 'https://picsum.photos/id/488/300/300',
          quantity: 500,
          unit: 'g',
        }), [ 'stock' ])}
      />
    </Suspense>
  </BrowserRouter>
);
