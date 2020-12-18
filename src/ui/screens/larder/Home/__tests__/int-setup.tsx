import React, { ReactNode, useEffect, useRef } from 'react';
import { Provider as Jpex } from 'react-jpex';
import { Provider as Respite } from '@respite/query';
import { createMemoryHistory } from 'history';
import { Stock } from 'domain/core/stock';
import { IStockService } from 'ports/stock';
import { Category } from 'domain/core';
import { ICategoryService } from 'ports/categories';
import { Route, Router, useLocation } from 'react-router';
import { Entity } from 'ports/entity';

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
  class StockService extends Entity<Stock> implements IStockService {
    search() {
      return Promise.resolve(stock.current);
    }
    create(args: any) {
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
    }
  }
  class CategoryService extends Entity<Category> implements ICategoryService {
    readAll() {
      return Promise.resolve(categories.current);
    }
  }

  return (
    <Jpex
      inherit={false}
      onMount={jpex => {
        jpex.service(StockService);
        jpex.service(CategoryService);
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
