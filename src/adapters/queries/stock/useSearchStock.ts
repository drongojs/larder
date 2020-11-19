import { useResolve } from 'react-jpex';
import { useDebounce } from 'use-debounce';
import { Search } from 'domain/core/stock';
import { useResource } from '@drongo/recess';

export const useSearchStock = (
  args: {
    search: string,
  },
) => {
  const [ search ] = useDebounce(args.search, 250);
  const fetch = useResolve<Search>();

  return useResource(() => fetch({ search }), [ search ]);
};

export default useSearchStock;
