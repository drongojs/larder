import {
  useCallback,
} from 'react';
import { Filter } from 'core/larder';
import { useQueryState } from 'presentation/hooks';

export const useGrouped = () => {
  const [ state, setState ] = useQueryState<string>('grouped', 'false');

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
  return useQueryState<Filter>('filter', 'everything');
};

export const useSearch = () => {
  return useQueryState<string>('q', '');
};
