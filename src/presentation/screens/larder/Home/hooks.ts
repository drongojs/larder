import {
  useCallback,
} from 'react';
import { Filter } from 'domain/core/larder';
import { useQueryState } from 'presentation/hooks';

export const useGrouped = () => {
  const [ state, setState ] = useQueryState('grouped', 'false');

  const grouped = state === 'true';
  const toggleGrouped = useCallback(() => {
    setState(`${!grouped}`);
  }, [ setState, grouped ]);

  return [ grouped, toggleGrouped ] as [
    typeof grouped,
    typeof toggleGrouped,
  ];
};

export const useFilter = () => {
  return useQueryState('filter', 'everything') as any as Filter;
};

export const useSearch = () => {
  return useQueryState('q', '');
};
