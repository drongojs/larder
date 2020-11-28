import { Category } from 'domain/core';
import { Read, Create } from 'domain/core/categories';
import { Jpex } from 'jpex';

export const getCategories = (): Category[] => JSON.parse(sessionStorage.getItem('categories') || '[]');
export const setCategories = (category: Category[]) => sessionStorage.setItem('categories', JSON.stringify(category));

export default (jpex: Jpex) => {
  jpex.constant<Read>(() => {
    return Promise.resolve(getCategories());
  });
  jpex.constant<Create>(({ name }) => {
    const categories = getCategories();
    const category = {
      id: name.toLowerCase(),
      name,
    };
    categories.push(category);
    setCategories(categories);
    return Promise.resolve(category);
  });
};
