import { useQuery, QueryConfig } from 'react-query';
import { useResolve } from 'react-jpex';
import { FetchIngredient, Ingredient } from 'core/ingredients';

export const useIngredient = ({ id }: { id: string }, opts?: QueryConfig<Ingredient>) => {
  const fetch = useResolve<FetchIngredient>();
  return useQuery([ 'ingredient', id ], () => fetch({ id }), opts);
};
