import { useResolve } from 'react-jpex';
import { Create } from 'domain/core/categories';
import { Resource, useAction } from '@drongo/recess';

export const useCreate = (resources?: Resource[]) => {
  return useAction(useResolve<Create>(), [], resources);
};
