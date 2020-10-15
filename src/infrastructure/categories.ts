import {
  FetchCategory,
  Category,
  FetchCategories,
  CreateCategory,
} from 'core/categories';
import { after } from 'crosscutting/utils';
import { JpexInstance } from 'jpex';

export const categories = [
  {
    id: 'frozen',
    name: 'Frozen',
    icon: 'ac_unit',
  },
  {
    id: 'tins',
    name: 'Tinned',
    icon: 'delete_outline',
  },
  {
    id: 'veg',
    name: 'Fruit / Veg',
    icon: 'grass',
  },
];

export const fetchCategory = (): FetchCategory => ({ id }) => {
  return after<Category>(1000, categories.find((c) => c.id === id));
};

export const fetchCategories = (): FetchCategories => () => {
  return after<Category[]>(1000, categories);
};

export const createCategory = (): CreateCategory => (args) => {
  const category = {
    id: args.name.toLowerCase(),
    icon: null,
    ...args,
  };
  categories.push(category);

  return after<Category>(500, category);
};

export default (jpex: JpexInstance) => {
  jpex.factory<FetchCategory>(fetchCategory);
  jpex.factory<FetchCategories>(fetchCategories);
  jpex.factory<CreateCategory>(createCategory);
};
