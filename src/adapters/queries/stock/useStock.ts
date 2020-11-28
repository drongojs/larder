import { useResolve } from 'react-jpex';
import { Read } from 'domain/core/stock';
import { useQuery } from '@drongo/respite';
import { Queries } from 'domain/constants';

export const useStock = (
  {
    id,
  }: {
    id: string,
  },
) => {
  const fetch = useResolve<Read>();

  return useQuery(() => fetch({ id }), [ Queries.STOCK, id ]);
};

export default useStock;
