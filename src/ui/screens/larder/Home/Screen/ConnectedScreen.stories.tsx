import React from 'react';
import { Provider as JpexProvider } from 'react-jpex';
import ConnectedScreen from './ConnectedScreen';
import { after } from 'crosscutting/utils';
import { IStockService } from 'ports/stock';
import { ICategoryService } from 'ports/categories';
import { Entity } from 'ports/entity';
import { Category, Stock } from 'domain/core';

export default {
  title: 'screens/larder/Home/Screen',
};

class StockService extends Entity<Stock> implements IStockService {
  stock: Stock[] = [
    {
      id: 'peas',
      categoryId: 'frozen',
      name: 'peas',
      quantity: 500,
      unit: 'g',
      image: 'https://picsum.photos/id/488/300/300',
    },
    {
      id: 'chips',
      categoryId: 'frozen',
      name: 'chips',
      quantity: 1,
      unit: 'kg',
      image: 'https://picsum.photos/id/488/300/300',
    },
  ]

  search() {
    return after(500, this.stock);
  }
  async create(args) {
    await after(500);

    const item = {
      id: args.name,
      name: args.name,
      categoryId: '',
      image: 'https://picsum.photos/id/488/300/300',
      quantity: args.quantity ?? 1,
      unit: args.unit,
    };
    this.stock = [
      ...this.stock,
      item,
    ];
    return item;
  }
}
class CategoryService extends Entity<Category> implements ICategoryService {
  categories: Category[] = [
    {
      id: 'frozen',
      name: 'Frozen',
    },
  ];

  readAll() {
    return after(500, this.categories);
  }
}

export const connected = () => {
  return (
    <JpexProvider
      onMount={jpex => {
        jpex.service(StockService);
        jpex.service(CategoryService);
      }}
    >
      <ConnectedScreen/>
    </JpexProvider>
  );
};
