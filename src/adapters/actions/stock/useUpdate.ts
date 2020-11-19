import { useResolve } from 'react-jpex';
import { Update } from 'domain/core/stock';
import { useAction, Resource } from '@drongo/recess';

const useUpdate = (resources?: Resource[]) => {
  return useAction(useResolve<Update>(), [], resources);
};

export default useUpdate;
