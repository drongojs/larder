import { useResolve } from 'react-jpex';
import { Read } from 'domain/core/stock';
import { useResource } from '@drongo/recess';

export const useStock = (
  {
    id,
  }: {
    id: string,
  },
) => {
  const fetch = useResolve<Read>();

  return useResource(() => fetch({ id }), [ id ]);
};

export default useStock;
