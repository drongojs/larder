import { useResolve } from 'react-jpex';
import { Create } from 'domain/core/categories';
import { useAction } from '@drongo/respite';
import { Queries } from 'domain/constants';

export const useCreate = () => {
  return useAction(useResolve<Create>(), [], Queries.CATEGORIES);
};
