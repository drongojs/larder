import { useQuery, QueryConfig } from 'react-query';
import { useResolve } from 'react-jpex';
import { Ingredient } from 'core/ingredients';
import { INGREDIENT } from 'domain/constants/queries';
import { Driver } from 'core/driver';

export const useFetchIngredient = () => {
  const driver = useResolve<Driver>();
  return (params: { id: string }) => driver<Ingredient>({
    url: '/api/ingredient/:id',
    params,
  });
};

export const useIngredient = (vars: { id: string }, opts?: QueryConfig<Ingredient>) => {
  const { id } = vars;
  const fetch = useFetchIngredient();
  return useQuery(
    [ INGREDIENT, id ],
    () => fetch(vars),
    {
      ...opts,
      enabled: (opts?.enabled ?? true) && Boolean(id),
    },
  );
};

export default useIngredient;
