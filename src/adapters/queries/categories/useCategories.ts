import { useResolve } from 'react-jpex';
import { Read } from 'domain/core/categories';
import { useQuery } from '@drongo/respite';
import { Queries } from 'domain/constants';

export const useCategories = () => {
  const fetch = useResolve<Read>();
  return useQuery(fetch, [ Queries.CATEGORIES ]);
};

export default useCategories;
