import { Category } from 'domain/core';
import jpex from 'jpex';
import { Driver } from 'ports/driver';
import {
  RestEntity,
  IEntity,
} from '../entity';

export interface ICategoryService extends IEntity<Category> {
  readAll(): Promise<Category[]>,
}

class CategoryService extends RestEntity<Category> implements ICategoryService {
  constructor(driver: Driver) {
    super(driver, '/api/category');
  }

  readAll(): Promise<Category[]> {
    return this.driver<Category[]>({
      url: '/api/categories',
    });
  }
}

jpex.service(CategoryService);
