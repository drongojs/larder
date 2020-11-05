import { Category } from './categories';
import { Ingredient } from './ingredients';
import { StockType } from 'domain/constants';

export interface Stock {
  type: StockType,
  id: string,
  category: string,
  quantity: number,
}

// eslint-disable-next-line max-len
export interface StockModel extends Omit<Stock, 'category'>, Omit<Ingredient, 'category'> {
  category?: Category,
}
