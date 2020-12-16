import { useAction } from '@drongo/respite';
import { Queries } from 'domain/constants';
import { IStockService } from 'ports/stock';
import { encase } from 'react-jpex';

const useDelete = (service: IStockService) => () => {
  return useAction(service.delete.bind(service), [], Queries.SEARCH_STOCK);
};

export default encase(useDelete);
