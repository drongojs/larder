import { useQuery, QueryConfig, useQueryCache } from 'react-query';
import { useResolve } from 'react-jpex';
import { Category } from 'core/categories';
import { Driver } from 'core/driver';
import { CATEGORY, CATEGORIES } from 'domain/constants/queries';
import { useFetchCategory } from './useCategory';

export const useFetchCategories = () => {
  const driver = useResolve<Driver>();
  return () => driver<Category[]>({
    url: '/api/categories',
  });
};

export const useCategories = (opts?: QueryConfig<Category[]>) => {
  const fetch = useFetchCategory();
  const cache = useQueryCache();
  return useQuery(
    CATEGORIES,
    useFetchCategories(),
    {
      ...opts,
      onSuccess(categories) {
        categories.forEach((category) => {
          cache.setQueryData(
            [ CATEGORY, category.id ],
            category,
            {
              queryFn: () => fetch({ id: category.id }),
            },
          );
        });
      },
    },
  );
};

export default useCategories;
