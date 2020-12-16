import React from 'react';
import Screen from './ConnectedScreen';
import { MemoryRouter } from 'react-router-dom';
import { Provider as JpexProvider } from 'react-jpex';
import { IStockService } from 'ports/stock';
import { Category, Stock } from 'domain/core';
import { ICategoryService } from 'ports/categories';
import { after } from 'crosscutting/utils';
import { Entity } from 'ports/entity';

export default {
  title: 'screens/larder/Edit/Screen',
  component: Screen,
};

class CategoryService extends Entity<Category> implements ICategoryService {
  categories: Category[] = [
    {
      id: 'frozen',
      name: 'Frozen',
    },
    {
      id: 'tinned',
      name: 'Tinned',
    },
  ];

  readAll() {
    return after(500, this.categories);
  }
  async create({ name }: { name: string }) {
    await after(250);

    const category = {
      id: name,
      name,
    };
    this.categories = [ ...this.categories, category ];

    return category;
  }
}
class StockService extends Entity<Stock> implements IStockService {
  stock: Stock = {
    id: 'peas',
    name: 'Peas',
    categoryId: 'frozen',
    image: 'https://picsum.photos/id/488/300/300',
    quantity: 500,
    unit: 'g',
  };

  search(): any {}
  read() {
    return after(25, this.stock);
  }
  async update(data: any) {
    await after(500);
    this.stock = {
      ...this.stock,
      ...data,
    };
    return this.stock;
  }
}

export const basic = () => {
  return (
    <JpexProvider inherit={false} onMount={jpex => {
      jpex.service(StockService);
      jpex.service(CategoryService);
    }}>
      <MemoryRouter initialEntries={[ 'larder/peas/edit' ]}>
        <Screen/>
      </MemoryRouter>
    </JpexProvider>
  );
};
