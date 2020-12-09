import React, { ReactNode, useEffect, useRef } from 'react';
import { Provider as Jpex } from 'react-jpex';
import { Provider as Respite } from '@drongo/respite';
import { createMemoryHistory } from 'history';
import { Create, Search, Stock } from 'domain/core/stock';
import { Category } from 'domain/core';
import { Read as ReadCategories } from 'domain/core/categories';
import { Route, Router, useLocation } from 'react-router';

global['SKIP_ANIMATIONS'] = true;

export const demoStock: Stock[] = [
  {
    id: 'peas',
    name: 'Peas',
    quantity: 500,
    unit: 'g',
    image: '',
    categoryId: '',
  },
  {
    id: 'chips',
    name: 'Chips',
    quantity: 1000,
    unit: 'g',
    image: '',
    categoryId: '',
  },
];

const WrapperInner = (props: {
  onLocationChange?: (location: Location) => void,
  children: ReactNode,
}) => {
  const location = useLocation();
  useEffect(() => {
    props.onLocationChange?.(location as any);
  }, [ location.pathname ]);

  return (
    <>
      {props.children}
    </>
  );
};

export const Wrapper = (props: {
  stock?: Stock[],
  categories?: Category[],
  onLocationChange?: (location: Location) => void,
  children: ReactNode,
}) => {
  const stock = useRef<Stock[]>(props.stock || []);
  const categories = useRef<Category[]>(props.categories || []);
  const history = createMemoryHistory();

  return (
    <Jpex
      inherit={false}
      onMount={jpex => {
        jpex.constant<Search>(() => Promise.resolve(stock.current));
        jpex.constant<Create>(args => {
          const item = {
            id: args.name,
            categoryId: '',
            image: '',
            name: '',
            quantity: 1,
            ...args,
          };
          stock.current = [
            ...stock.current,
            item,
          ];

          return Promise.resolve(stock.current[stock.current.length - 1]);
        });
        jpex.constant<ReadCategories>(() => Promise.resolve(categories.current));
      }}
    >
      <Respite>
        <Router history={history}>
          <Route path="*">
            <WrapperInner onLocationChange={props.onLocationChange}>
              {props.children}
            </WrapperInner>
          </Route>
        </Router>
      </Respite>
    </Jpex>
  );
};
