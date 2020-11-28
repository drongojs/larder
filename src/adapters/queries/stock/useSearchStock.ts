import { useResolve } from 'react-jpex';
import { useDebounce } from 'use-debounce';
import { Search } from 'domain/core/stock';
import { useQuery } from '@drongo/respite';
import { Queries } from 'domain/constants';

export const useSearchStock = (
  args: {
    search: string,
  },
) => {
  const [ search ] = useDebounce(args.search, 250);
  const fetch = useResolve<Search>();

  return useQuery(() => fetch({ search }), [ Queries.SEARCH_STOCK, search ]);
};

export default useSearchStock;
