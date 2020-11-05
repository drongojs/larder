import { useQuery, QueryConfig, useQueryCache } from 'react-query';
import { useResolve } from 'react-jpex';
import { useDebounce } from 'use-debounce';
import { Stock } from 'core/stock';
import { StockType } from 'domain/constants';
import { SEARCH_STOCK, STOCK } from 'domain/constants/queries';
import { Driver } from 'core/driver';
import { useFetchStock as useFetchStockItem } from './useStock';

export const useFetchStock = () => {
  const driver = useResolve<Driver>();
  return ({ type, search }: { type: StockType, search: string }) => driver<Stock[]>({
    url: '/api/stock/:type/items',
    params: { type },
    data: {
      q: search,
    },
  });
};

export const useSearchStock = (
  args: {
    type: StockType,
    search: string,
  },
  opts?: QueryConfig<Stock[]>,
) => {
  const cache = useQueryCache();
  const [ search ] = useDebounce(args.search, 250);
  const { type } = args;
  const fetch = useFetchStock();
  const fetchOne = useFetchStockItem();

  const fn = () => fetch({
    search,
    type,
  });

  const config: QueryConfig<Stock[]> = {
    ...opts,
    onSuccess(items) {
      items.forEach((item) => {
        cache.setQueryData(
          [ STOCK, { type, id: item.id } ],
          item,
          {
            queryFn: () => fetchOne({ type, id: item.id }),
          },
        );
      });
    },
  };

  const query = useQuery(
    [ SEARCH_STOCK, { type, search } ],
    fn,
    config,
  );
  return query;
};

export default useSearchStock;
