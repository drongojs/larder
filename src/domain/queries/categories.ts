import { useQuery, QueryConfig, useQueryCache } from 'react-query';
import { useResolve } from 'react-jpex';
import { FetchCategory, FetchCategories, Category } from 'core/categories';

export const useCategory = ({ id }: { id: string }, opts?: QueryConfig<Category>) => {
  const fetch = useResolve<FetchCategory>();
  return useQuery([ 'category', id ], () => fetch({ id }), opts);
};

export const useCategories = (opts?: QueryConfig<Category[]>) => {
  const cache = useQueryCache();
  const fetch = useResolve<FetchCategories>();
  return useQuery([ 'categories' ], () => fetch(), {
    ...opts,
    onSuccess(categories) {
      categories.forEach((category) => {
        cache.setQueryData([ 'category', category.id ], category);
      });
    },
  });
};
