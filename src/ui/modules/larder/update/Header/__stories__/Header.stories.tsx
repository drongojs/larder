import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { useResource } from '@drongo/recess';

export default {
  title: 'modules/larder/update/Header',
  component: Header,
};

export const basic = () => (
  <BrowserRouter>
    <Suspense fallback={<div/>}>
      <Header
        resource={useResource(() => ({
          id: 'peas',
          name: 'Peas',
          categoryId: '',
          image: 'http://lorempixel.com/300/300/food/',
          quantity: 500,
          unit: 'g',
        }), [])}
      />
    </Suspense>
  </BrowserRouter>
);
