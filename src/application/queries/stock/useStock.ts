import { useQuery, QueryConfig } from 'react-query';
import { useResolve } from 'react-jpex';
import { Stock } from 'core/stock';
import { StockType } from 'domain/constants';
import { STOCK } from 'domain/constants/queries';
import { Driver } from 'core/driver';

export const useFetchStock = () => {
  const driver = useResolve<Driver>();
  return (params: { type: StockType, id: string }) => driver<Stock>({
    url: '/api/stock/:type/item/:id',
    params,
  });
};

export const useStock = (
  args: {
    type: StockType,
    id: string,
  },
  opts?: QueryConfig<Stock>,
) => {
  const fetch = useFetchStock();
  return useQuery(
    [ STOCK, args ],
    () => fetch(args),
    {
      ...opts,
      enabled: (opts?.enabled ?? true) && Boolean(args.id),
    },
  );
};

export default useStock;
