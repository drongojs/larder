import { Query, useAction } from '@drongo/respite';
import { Queries } from 'domain/constants';
import { IStockService } from 'ports/stock';
import { encase } from 'react-jpex';

const useUpdate = (service: IStockService) => (queries: Query[] = []) => {
  return useAction(service.update.bind(service), [], Queries.SEARCH_STOCK, ...queries);
};

export default encase(useUpdate);
