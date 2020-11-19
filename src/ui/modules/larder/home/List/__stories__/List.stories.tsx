import React, { Suspense, useState, useEffect } from 'react';
import List from '../List';
import ListLoading from '../ListLoading';
import { useResource } from '@drongo/recess';
import { Stock } from 'domain/core';

export default {
  title: 'modules/larder/home/List',
};

export const loading = () => {
  const stockResource = useResource(() => new Promise<any>(() => {}), []);
  const categoryResource = useResource(() => new Promise<any>(() => {}), []);

  return (
    <Suspense fallback={<ListLoading/>}>
      <List
        categoryResource={categoryResource}
        stockResource={stockResource}
        onClick={() => {}}
      />
    </Suspense>
  );
};

export const empty = () => {
  const stockResource = useResource(() => [], []);
  const categoryResource = useResource(() => [], []);

  return (
    <Suspense fallback={<div/>}>
      <List
        stockResource={stockResource}
        categoryResource={categoryResource}
        onClick={() => {}}
      />
    </Suspense>
  );
};

export const SingleCategory = () => {
  const stock: Stock[] = [
    {
      id: 'peas',
      categoryId: 'frozen',
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
  ];
  const stockResource = useResource(() => stock, []);
  const categoryResource = useResource(() => [], []);

  return (
    <Suspense fallback={<div/>}>
      <List
        stockResource={stockResource}
        categoryResource={categoryResource}
        onClick={() => {}}
      />
    </Suspense>
  );
};

export const ManyItems = () => {
  const stock: Stock[] = [
    {
      id: 'peas',
      categoryId: 'frozen',
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
    {
      id: 'curry',
      categoryId: 'tinned',
      name: 'Curry',
      quantity: 500,
      unit: 'g',
      image: 'http://lorempixel.com/100/100/food/',
    },
    {
      id: 'tuna',
      categoryId: 'tinned',
      name: 'Tuna',
      quantity: 1,
      unit: 'kg',
      image: 'http://lorempixel.com/100/100/food/',
    },
    {
      id: 'lettuce',
      categoryId: 'veg',
      name: 'lettuce',
      quantity: 500,
      unit: 'g',
      image: 'http://lorempixel.com/100/100/food/',
    },
    {
      id: 'cucumber',
      categoryId: 'veg',
      name: 'cucumber',
      quantity: 1,
      unit: 'kg',
      image: 'http://lorempixel.com/100/100/food/',
    },
  ];
  const categories = [
    {
      id: 'frozen',
      name: 'Frozen',
    },
    {
      id: 'tinned',
      name: 'Tinned',
    },
    {
      id: 'veg',
      name: 'Fruit / Veg',
    },
  ];
  const stockResource = useResource(() => stock, []);
  const categoryResource = useResource(() => categories, []);

  return (
    <Suspense fallback={<div/>}>
      <List
        stockResource={stockResource}
        categoryResource={categoryResource as any}
        onClick={() => {}}
      />
    </Suspense>
  );
};


export const refreshing = () => {
  const stock: Stock[] = [
    {
      id: 'peas',
      categoryId: 'frozen',
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
    {
      id: 'curry',
      categoryId: 'tinned',
      name: 'Curry',
      quantity: 500,
      unit: 'g',
      image: 'http://lorempixel.com/100/100/food/',
    },
    {
      id: 'tuna',
      categoryId: 'tinned',
      name: 'Tuna',
      quantity: 1,
      unit: 'kg',
      image: 'http://lorempixel.com/100/100/food/',
    },
    {
      id: 'lettuce',
      categoryId: 'veg',
      name: 'lettuce',
      quantity: 500,
      unit: 'g',
      image: 'http://lorempixel.com/100/100/food/',
    },
    {
      id: 'cucumber',
      categoryId: 'veg',
      name: 'cucumber',
      quantity: 1,
      unit: 'kg',
      image: 'http://lorempixel.com/100/100/food/',
    },
  ];
  const categories = [
    {
      id: 'frozen',
      name: 'Frozen',
    },
    {
      id: 'tinned',
      name: 'Tinned',
    },
    {
      id: 'veg',
      name: 'Fruit / Veg',
    },
  ];
  const [ p, setP ] = useState(Promise.resolve(stock));
  const stockResource = useResource(() => p, [ p ]);
  const categoryResource = useResource(() => categories, []);

  useEffect(() => {
    setTimeout(() => {
      setP(new Promise(() => {}));
    }, 1000);
  }, []);

  return (
    <Suspense fallback={<div/>}>
      <List
        stockResource={stockResource}
        categoryResource={categoryResource as any}
        onClick={() => {}}
      />
    </Suspense>
  );
};

export const ChangeQuantity = () => {
  const [ stock, setStock ] = useState([
    {
      id: 'peas',
      categoryId: 'frozen',
      name: 'peas',
      quantity: 500,
      unit: 'g',
      image: 'http://lorempixel.com/100/100/food/',
    },
  ]);
  const stockResource = useResource(() => stock, [ stock ]);
  const categoryResource = useResource(() => [], []);

  const onAddMore = () => {
    setStock([
      {
        ...stock[0],
        quantity: stock[0].quantity + 100,
      },
    ]);
    stockResource.invalidate();
  };

  return (
    <Suspense fallback={<div/>}>
      <List
        stockResource={stockResource}
        categoryResource={categoryResource}
        onClick={() => {}}
      />
      <div>
        <button onClick={onAddMore}>Add more!</button>
      </div>
    </Suspense>
  );
};
