import { useQuery, QueryConfig } from 'react-query';
import { useResolve } from 'react-jpex';
import { Category } from 'core/categories';
import { Driver } from 'core/driver';
import { CATEGORY } from 'domain/constants/queries';

export const useFetchCategory = () => {
  const driver = useResolve<Driver>();
  return (params: { id: string }) => driver<Category>({
    url: '/api/category/:id',
    params,
  });
};

export const useCategory = (vars: { id: string }, opts?: QueryConfig<Category>) => {
  const fetch = useFetchCategory();
  return useQuery(
    [ CATEGORY, vars.id ],
    () => fetch(vars),
    {
      ...opts,
      enabled: (opts?.enabled ?? true) && Boolean(vars.id),
    },
  );
};

export default useCategory;
