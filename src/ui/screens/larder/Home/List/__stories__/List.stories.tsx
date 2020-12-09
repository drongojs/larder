import React, { Suspense, useState, useEffect } from 'react';
import List from '../List';
import ListLoading from '../ListLoading';
import { useQuery } from '@drongo/respite';
import { Stock } from 'domain/core';

export default {
  title: 'screens/larder/Home/List',
};

export const loading = () => {
  const stockQuery = useQuery(() => new Promise<any>(() => {}), [ 'stock' ]);
  const categoryQuery = useQuery(() => new Promise<any>(() => {}), [ 'categories' ]);

  return (
    <Suspense fallback={<ListLoading/>}>
      <List
        categoryQuery={categoryQuery}
        stockQuery={stockQuery}
        onClick={() => {}}
      />
    </Suspense>
  );
};

export const empty = () => {
  const stockQuery = useQuery(() => [], [ 'stock' ]);
  const categoryQuery = useQuery(() => [], [ 'categories' ]);

  return (
    <Suspense fallback={<div/>}>
      <List
        stockQuery={stockQuery}
        categoryQuery={categoryQuery}
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
      image: 'http://lorempixel.com/100/100/food/1',
    },
    {
      id: 'chips',
      categoryId: 'frozen',
      name: 'chips',
      quantity: 1,
      unit: 'kg',
      image: 'http://lorempixel.com/100/100/food/1',
    },
  ];
  const stockQuery = useQuery(() => stock, [ 'stock' ]);
  const categoryQuery = useQuery(() => [], [ 'categories' ]);

  return (
    <Suspense fallback={<div/>}>
      <List
        stockQuery={stockQuery}
        categoryQuery={categoryQuery}
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
      image: 'http://lorempixel.com/100/100/food/1',
    },
    {
      id: 'chips',
      categoryId: 'frozen',
      name: 'chips',
      quantity: 1,
      unit: 'kg',
      image: 'http://lorempixel.com/100/100/food/2',
    },
    {
      id: 'curry',
      categoryId: 'tinned',
      name: 'Curry',
      quantity: 500,
      unit: 'g',
      image: 'http://lorempixel.com/100/100/food/3',
    },
    {
      id: 'tuna',
      categoryId: 'tinned',
      name: 'Tuna',
      quantity: 1,
      unit: 'kg',
      image: 'http://lorempixel.com/100/100/food/4',
    },
    {
      id: 'lettuce',
      categoryId: 'veg',
      name: 'lettuce',
      quantity: 500,
      unit: 'g',
      image: 'http://lorempixel.com/100/100/food/5',
    },
    {
      id: 'cucumber',
      categoryId: 'veg',
      name: 'cucumber',
      quantity: 1,
      unit: 'kg',
      image: 'http://lorempixel.com/100/100/food/6',
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
  const stockQuery = useQuery(() => stock, [ 'stock' ]);
  const categoryQuery = useQuery(() => categories, [ 'categories' ]);

  return (
    <Suspense fallback={<div/>}>
      <List
        stockQuery={stockQuery}
        categoryQuery={categoryQuery as any}
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
      image: 'http://lorempixel.com/100/100/food/1',
    },
    {
      id: 'chips',
      categoryId: 'frozen',
      name: 'chips',
      quantity: 1,
      unit: 'kg',
      image: 'http://lorempixel.com/100/100/food/2',
    },
    {
      id: 'curry',
      categoryId: 'tinned',
      name: 'Curry',
      quantity: 500,
      unit: 'g',
      image: 'http://lorempixel.com/100/100/food/3',
    },
    {
      id: 'tuna',
      categoryId: 'tinned',
      name: 'Tuna',
      quantity: 1,
      unit: 'kg',
      image: 'http://lorempixel.com/100/100/food/4',
    },
    {
      id: 'lettuce',
      categoryId: 'veg',
      name: 'lettuce',
      quantity: 500,
      unit: 'g',
      image: 'http://lorempixel.com/100/100/food/5',
    },
    {
      id: 'cucumber',
      categoryId: 'veg',
      name: 'cucumber',
      quantity: 1,
      unit: 'kg',
      image: 'http://lorempixel.com/100/100/food/6',
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
  const [ p, setP ] = useState(() => Promise.resolve(stock));
  const stockResource = useQuery(() => p, [ 'stock', p ]);
  const categoryResource = useQuery(() => categories, [ 'categories' ]);

  useEffect(() => {
    setTimeout(() => {
      setP(new Promise(() => {}));
      stockResource.invalidate();
    }, 50);
  }, []);

  return (
    <Suspense fallback={<div/>}>
      <List
        stockQuery={stockResource}
        categoryQuery={categoryResource}
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
      quantity: 200,
      unit: 'g',
      image: 'http://lorempixel.com/100/100/food/1',
    },
  ]);
  const stockResource = useQuery(() => stock, [ 'stock', stock ]);
  const categoryResource = useQuery(() => [], [ 'categories' ]);

  useEffect(() => {
    setTimeout(() => {
      setStock([
        {
          ...stock[0],
          quantity: stock[0].quantity + 200,
        },
      ]);
    }, 1500);
    // stockResource.invalidate();
  }, [ stock ]);

  return (
    <Suspense fallback={<div/>}>
      <List
        stockQuery={stockResource}
        categoryQuery={categoryResource}
        onClick={() => {}}
      />
    </Suspense>
  );
};
