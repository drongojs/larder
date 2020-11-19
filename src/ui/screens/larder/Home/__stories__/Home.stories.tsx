import React, { Suspense, useState } from 'react';
import Home from '../Home';
import { useResource } from '@drongo/recess';
import { Stock } from 'domain/core';

export default {
  title: 'screens/larder/Home',
  component: Home,
};

export const basic = () => {
  const [ search, setSearch ] = useState('');
  const [ submitting, setSubmitting ] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSearch('');
      resource.invalidate();
    }, 2000);
  };
  const resource = useResource(() => {
    return new Promise<Stock[]>((res) => {
      setTimeout(() => {
        res([
          {
            id: 'peas',
            categoryId: 'tinned',
            name: 'peas',
            quantity: 500,
            unit: 'g',
            image: 'http://lorempixel.com/100/100/food/',
          },
          {
            id: 'chips',
            categoryId: 'frozen',
            name: 'chips',
            quantity: 1,
            unit: 'kg',
            image: 'http://lorempixel.com/100/100/food/',
          },
        ]);
      }, 1000);
    });
  }, []);
  const categoryResource = useResource(() => [], []);

  return (
    <Suspense fallback={<div/>}>
      <div style={{ height: 700 }}>
        <Home
          search={search}
          onSearch={setSearch}
          onSubmit={handleSubmit}
          submitting={submitting}
          stockResource={resource}
          categoryResource={categoryResource}
          onClick={(id) => alert(id)}
        />
      </div>
    </Suspense>
  );
};
