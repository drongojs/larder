import { useResolve } from 'react-jpex';
import { Create } from 'domain/core/stock';
import { useAction, Resource } from '@drongo/recess';

// This endpoint is actually not your typical Crud
// if you pass in a name that's an exact match for an existing item
// then it will actually "adjust" the quantity of that item
// if it is definitely a brand new item, it creates it
const useCreate = (resources?: Resource[]) => {
  return useAction(useResolve<Create>(), [], resources);
};

export default useCreate;
