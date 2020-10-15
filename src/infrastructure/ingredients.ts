import { FetchIngredient, Ingredient } from 'core/ingredients';
import { JpexInstance } from 'jpex';
import { after } from 'crosscutting/utils';

export const ingredients = [
  {
    id: 'peas',
    category: 'frozen',
    name: 'Peas',
    unit: 'g',
  },
  {
    id: 'chips',
    category: 'frozen',
    name: 'Chips',
    unit: 'kg',
  },
];

export const fetchIngredient = (): FetchIngredient => ({ id }) => {
  return after<Ingredient>(1000, ingredients.find((i) => i.id === id));
};

export default (jpex: JpexInstance) => {
  jpex.factory<FetchIngredient>(fetchIngredient);
};
