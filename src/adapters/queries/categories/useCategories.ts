import { useResolve } from 'react-jpex';
import { Read } from 'domain/core/categories';
import { useResource } from '@drongo/recess';

export const useCategories = () => {
  const fetch = useResolve<Read>();
  return useResource(fetch, []);
};

export default useCategories;
