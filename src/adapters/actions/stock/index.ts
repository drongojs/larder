import { useResolve } from 'react-jpex';
import { Create, Delete, Update } from 'domain/core/stock';
import { useAction, Query } from '@drongo/respite';
import { Queries } from 'domain/constants';

// This endpoint is actually not your typical Crud
// if you pass in a name that's an exact match for an existing item
// then it will actually "adjust" the quantity of that item
// if it is definitely a brand new item, it creates it
export const useCreate = () => {
  return useAction(useResolve<Create>(), [], Queries.SEARCH_STOCK);
};

export const useDelete = () => {
  return useAction(useResolve<Delete>(), [], Queries.SEARCH_STOCK);
};

export const useUpdate = (queries: Query[] = []) => {
  return useAction(useResolve<Update>(), [], Queries.SEARCH_STOCK, ...queries);
};
