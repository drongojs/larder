import { useMutation, useQueryCache } from 'react-query';
import { useResolve } from 'react-jpex';
import { CreateCategory } from 'core/categories';

export const useCreateCategory = () => {
  const cache = useQueryCache();
  const fn = useResolve<CreateCategory>();
  return useMutation(fn, {
    onSuccess() {
      cache.invalidateQueries('categories');
    },
  });
};
