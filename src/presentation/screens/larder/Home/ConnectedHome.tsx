import React, { useMemo, useCallback } from 'react';
import Home from './Home';
import {
  useFilter,
  useGrouped,
  useSearch,
} from './hooks';
import { enhance } from 'presentation/hocs';
import { useSearchStock } from 'adapters/queries/stock';
import { useId, parseSearch } from 'domain/selectors';
import { useHistory } from 'react-router';
import { StockType } from 'domain/constants';

const ConnectedHome = () => {
  const [ filter, setFilter ] = useFilter();
  const [ grouped, toggleGrouped ] = useGrouped();
  const [ search, setSearch ] = useSearch();
  const { name: query } = useMemo(() => parseSearch(search), [ search ]);
  const stockQuery = useSearchStock({
    type: StockType.LARDER,
    search: query,
  });
  const id = useId();
  const history = useHistory();
  const onCloseModal = useCallback(() => {
    history.push('/larder');
  }, [ history ]);

  return (
    <Home
      id={id}
      filter={filter}
      setFilter={setFilter}
      grouped={grouped}
      toggleGrouped={toggleGrouped}
      search={search}
      setSearch={setSearch}
      stockQuery={stockQuery}
      onCloseModal={onCloseModal}
    />
  );
};

export default enhance('ConnecteHome')(ConnectedHome);
