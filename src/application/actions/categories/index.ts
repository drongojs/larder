import { useMutation, useQueryCache } from 'react-query';
import { useResolve } from 'react-jpex';
import { CATEGORIES } from 'domain/constants/queries';
import { Driver } from 'core/driver';
import { Category } from 'core';

export const useCreateCategory = () => {
  const cache = useQueryCache();
  const driver = useResolve<Driver>();
  const fn = (data: {
    name: string,
    icon?: string,
  }) => driver<Category>({
    url: '/api/categories',
    method: 'POST',
    data,
  });

  return useMutation(fn, {
    onSuccess() {
      cache.invalidateQueries(CATEGORIES);
    },
  });
};
