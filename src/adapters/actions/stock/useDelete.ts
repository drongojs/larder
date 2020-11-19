import { useResolve } from 'react-jpex';
import { Delete } from 'domain/core/stock';
import { useAction, Resource } from '@drongo/recess';

const useDelete = (resources?: Resource[]) => {
  return useAction(useResolve<Delete>(), [], resources);
};

export default useDelete;
