import { useQuery, QueryConfig } from 'react-query';
import { useResolve } from 'react-jpex';
import { useDebounce } from 'use-debounce';
import { FetchStock, Stock } from 'core/stock';

export const useStock = (
  args: Parameters<FetchStock>[0],
  opts?: QueryConfig<Stock[]>,
) => {
  const [ search ] = useDebounce(args.search, 250);
  const {
    type,
    id,
  } = args;
  const fetch = useResolve<FetchStock>();
  const query = useQuery([ 'stock', type, id, search ], () => {
    return fetch(args);
  }, opts);
  return query;
};
