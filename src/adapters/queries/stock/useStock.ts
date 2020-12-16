import { useQuery } from '@drongo/respite';
import { Queries } from 'domain/constants';
import { IStockService } from 'ports/stock';
import { encase } from 'react-jpex';

const useStock = (service: IStockService) => ({ id }: { id: string }) => {
  return useQuery(() => service.read({ id }), [ Queries.STOCK, id ]);
};

export default encase(useStock);
