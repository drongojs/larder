import { useAction } from '@respite/action';
import { Queries } from 'domain/constants';
import { IStockService } from 'ports/stock';
import { encase } from 'react-jpex';

// This endpoint is actually not your typical Crud
// if you pass in a name that's an exact match for an existing item
// then it will actually "adjust" the quantity of that item
// if it is definitely a brand new item, it creates it
const useCreate = (service: IStockService) => () => {
  return useAction(service.create.bind(service), Queries.SEARCH_STOCK);
};

export default encase(useCreate);
