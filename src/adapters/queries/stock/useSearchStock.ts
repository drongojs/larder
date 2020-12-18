import { useQuery } from '@respite/query';
import { Queries } from 'domain/constants';
import { IStockService } from 'ports/stock';
import { encase } from 'react-jpex';
import { useDebounce } from 'use-debounce';

const useSearchStock = (service: IStockService) => (args: { search: string }) => {
  const [ search ] = useDebounce(args.search, 250);

  return useQuery(() => service.search({ search }), [ Queries.SEARCH_STOCK, search ]);
};

export default encase(useSearchStock);
