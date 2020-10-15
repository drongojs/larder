import {
  FetchStock,
  CreateStock,
  PatchStock,
  AddQuantity,
  DeleteStock,
  Stock,
} from 'core/stock';
import { JpexInstance } from 'jpex';
import convert from 'convert-units';
import { after } from 'crosscutting/utils';
import { categories } from './categories';
import { ingredients } from './ingredients';

const stock = [
  {
    type: 'larder' as const,
    id: 'peas',
    category: 'frozen',
    quantity: 500,
  },
  {
    type: 'larder' as const,
    id: 'chips',
    category: 'frozen',
    quantity: 1,
  },
];

export const fetchStock = (): FetchStock => ({ id, search, type }) => {
  if (!search && !id) {
    const filtered = stock.filter((stock) => stock.type === type);
    return after<Stock[]>(1000, filtered);
  }
  // for the sake of faking the api we'll just do a bit of hacking about
  const filtered = stock.filter((stock) => {
    if (stock.type !== type) {
      return false;
    }
    if (id) {
      return stock.id === id;
    }
    const ingredient = ingredients.find((i) => i.id === stock.id);
    const category = categories.find((c) => c.id === ingredient?.category);
    if (ingredient?.name.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (category?.name.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    return false;
  });
  return after(1000, filtered);
};

export const createStock = (): CreateStock => ({
  type,
  name,
  quantity = 1,
  unit,
}) => new Promise((res) => {
  let ingredient = ingredients.find((i) => i.name.toLowerCase() === name.toLowerCase());
  if (ingredient == null) {
    ingredient = {
      id: name.toLowerCase(),
      name,
      unit,
      category: '',
    };
    ingredients.push(ingredient);
  }
  stock.push({
    type,
    id: ingredient.id,
    category: ingredient.category,
    quantity,
  });

  setTimeout(res, 1000);
});

export const patchStock = (): PatchStock => ({
  type,
  id,
  category,
  name,
  quantity,
  unit,
}) => new Promise((res, rej) => {
  const item = stock.find((s) => s.type === type && s.id === id);
  if (item == null) {
    return rej(new Error('not found'));
  }
  const ingredient = ingredients.find((i) => i.id === item.id);
  if (ingredient == null) {
    return rej(new Error('not found'));
  }

  ingredient.category = category ?? ingredient.category;
  ingredient.name = name ?? ingredient.name;
  ingredient.unit = unit ?? ingredient.unit;
  item.category = ingredient.category;
  item.quantity = quantity ?? item.quantity;

  setTimeout(res, 1000);
});

export const addQuantity = (patch: PatchStock): AddQuantity => ({
  type,
  id,
  quantity = 1,
  unit,
}) => new Promise((res, rej) => {
  const item = stock.find((s) => s.type === type && s.id === id);
  if (item == null) {
    return rej(new Error('not found'));
  }
  const ingredient = ingredients.find((i) => i.id === item.id);
  if (ingredient == null) {
    return rej(new Error('not found'));
  }

  if (unit == null) {
    unit = ingredient.unit;
  }

  if (unit !== ingredient.unit) {
    quantity = convert(quantity).from(unit as any).to(ingredient.unit as any);
  }

  quantity += item.quantity;

  return patch({
    type,
    id,
    quantity,
  }).then(res, rej);
});

export const deleteStock = (): DeleteStock => ({
  type,
  id,
}) => new Promise((res, rej) => {
  const item = stock.find((s) => s.type === type && s.id === id);
  if (item == null) {
    return rej(new Error('not found'));
  }
  const i = stock.indexOf(item);
  stock.splice(i, 1);
  res();
});

export default (jpex: JpexInstance) => {
  jpex.factory<FetchStock>(fetchStock);
  jpex.factory<CreateStock>(createStock);
  jpex.factory<PatchStock>(patchStock);
  jpex.factory<AddQuantity>(addQuantity);
  jpex.factory<DeleteStock>(deleteStock);
};
