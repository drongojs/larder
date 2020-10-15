import { Category } from './categories';
import { Ingredient } from './ingredients';

export type Type = 'larder';

export interface Stock {
  type: Type,
  id: string,
  category: string,
  quantity: number,
}

// eslint-disable-next-line max-len
export interface StockModel extends Omit<Stock, 'category'>, Omit<Ingredient, 'category'> {
  category?: Category,
}

export type FetchStock = (args: {
  type: Type,
  id?: string,
  search?: string,
}) => Promise<Stock[]>;

export type CreateStock = (args: {
  type: Type,
  quantity: number,
  name: string,
  unit: string,
  ingredient?: string,
  category?: string,
}) => Promise<Stock>;

export type AddQuantity = (args: {
  type: Type,
  id: string,
  quantity: number,
  unit: string,
}) => Promise<Stock>;

export type PatchStock = (args: {
  type: Type,
  id: string,
  quantity?: number,
  category?: string,
  name?: string,
  unit?: string,
}) => Promise<Stock>;

export type DeleteStock = (args: {
  type: Type,
  id: string,
}) => Promise<void>;
